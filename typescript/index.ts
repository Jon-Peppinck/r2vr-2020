import { Entity, Scene } from 'aframe';

import { of } from 'rxjs';

import {
  setMarkerColor,
  CORAL_COLOR,
  NOT_CORAL_COLOR,
} from './UI/marker-color';

import { CoralBinary, Data } from './declarations/data.d';
import { Image, InitialImage } from './declarations/image.d';

of('test!!').subscribe((x: any) => console.log(x));

// Assign global variables for the user and initial image
let user: string | undefined;
let initialImage: InitialImage;

// els: array of intersected entities => initialize to an empty array
let els: Entity[] = [];

// Stores the state of the image/s and there annotation status
let allImages: Image[];

// The last observation number will be retrieved async from the database
let lastObservationNumber: number;

// Determines the hover state and its ID of the marker of interest
let isMarkerHovered = false;
let selectedMarkerId: number;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  setLastObservationNumber();

  // Get the user name entered in R once DOM loaded
  user = document.getElementById('user')?.className;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  initialImage = getImageFilenameAndId();

  // Initial status is the initial image has not yet been annotated
  allImages = [
    {
      imgId: initialImage.imageId,
      isAnnotated: false,
    },
  ];
});

// WebVR button handler: 2D coral cover
AFRAME.registerComponent('coral-cover-2d-buttons', {
  /* eslint-disable-next-line func-names, object-shorthand */
  init: function () {
    // Select DOM element with button controls i.e. the scene
    const controlsEl = <Scene>document.querySelector('[button-controls]');

    // Detect buttons selected in WebVR
    controlsEl.addEventListener('buttondown', () => {
      // If button selected and marker hovered => display menu options
      if (isMarkerHovered) {
        // Marker is hovered thus must have a corresponding ID
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        displayMenuOptions(selectedMarkerId, true);
      } else {
        // If button clicked but not hovering a marker => intersected elements not a marker thus not of interest hence and empty array is set
        els = [];
      }
    });
  },
});

// Handles an intersected annotation point
AFRAME.registerComponent('intersection', {
  /* eslint-disable-next-line func-names, object-shorthand */
  init: function () {
    // Listen for an intersection between the ray-caster and entities
    // eslint-disable-next-line consistent-return
    this.el.addEventListener('raycaster-intersection', (e: any) => {
      if (e) {
        // In the event an intersection occurs => set the array of intersection elements
        els = e.detail.els;

        // TODO: Check comment
        // Expecting: `#markerCircumference${x}` and/or `#marker${x}`
        // TODO: Check for points near each other => make points unable to overlap
        if (els.length > 2) {
          els = [];
          return els;
        }
        // Determine if the marker is intersected iff expected result occurred
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        handleMarkerIntersection();
      }
    });
  },
});

// Determines if the marker is hovered
const handleMarkerIntersection = (): void => {
  // Prevents annotation points being marked if missing data
  if (!lastObservationNumber) {
    return;
  }

  // Get the marker ID number for the intersected marker
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const markerId = getMarkerId();

  // // Check if intersected element is the marker itself or a menu option
  if (
    els.some(
      (el: Entity) =>
        el.id === `marker${markerId}` ||
        el.id === `markerCircumference${markerId}` ||
        el.id === `menuCoral${markerId}` ||
        el.id === `menuNotCoral${markerId}` ||
        el.id === `coralText${markerId}` ||
        el.id === `notCoralText${markerId}`
    )
  ) {
    // Note: Menu options made visible in 'coral-cover-2d-buttons' custom AFRAME component => requires a button to be pressed to show options
    isMarkerHovered = true;

    // Check if a menu option is intersected
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isCoralIntersected();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isNotCoralIntersected();
  } else {
    // Marker no longer hovered
    isMarkerHovered = false;

    // Menu options no longer need to be visible
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    displayMenuOptions(markerId);
  }
};

// TODO: Refactor isCoralIntersected and isNotCoralIntersected into isMenuOptionIntersected
const isCoralIntersected = (): void => {
  // Get the marker id number for the selected marker
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const markerId = getMarkerId();

  // Set the global selected marker ID
  selectedMarkerId = markerId;

  // If an intersected entity is the coral menu
  if (
    els.some(
      (el: Entity) =>
        el.id === `menuCoral${markerId}` || el.id === `coralText${markerId}`
    )
  ) {
    // Save annotation to database: isCoral = 1 (coral)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    saveData(markerId, 1);

    // Hide menu options
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    displayMenuOptions(markerId);
  }
};

const isNotCoralIntersected = (): void => {
  // Get the marker id number for the selected marker

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const markerId = getMarkerId();

  // Set the global selected marker ID
  selectedMarkerId = markerId;

  // If an intersected entity is the not coral menu
  if (
    els.some(
      (el: Entity) =>
        el.id === `menuNotCoral${markerId}` ||
        el.id === `notCoralText${markerId}`
    )
  ) {
    // Save annotation to database: isNotCoral = 0 (not coral)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    saveData(markerId, 0);

    // Hide menu options
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    displayMenuOptions(markerId);
  }
};

const displayMenuOptions = (id: number, bool = false) => {
  if (bool) {
    // Menu options are now visible
    document.getElementById(`menuCoral${id}`)?.setAttribute('visible', 'true');
    document
      .getElementById(`menuNotCoral${id}`)
      ?.setAttribute('visible', 'true');
  } else {
    // Marker no longer hovered
    isMarkerHovered = false;

    // Menu options no longer need to be visible

    document.getElementById(`menuCoral${id}`)?.setAttribute('visible', 'false');
    document
      .getElementById(`menuNotCoral${id}`)
      ?.setAttribute('visible', 'false');
  }
};

// Set the image filename for the image being annotated
const getImageFilenameAndId = (): InitialImage => {
  // Get the canvas that images will be rendered on
  const canvas2D = <Entity>document.getElementById('canvas2d');

  // The image filename is found through its class
  // Note: the class will be updated when the next image is called via the R console through a websocket connection between R2VR and the browser

  const imgFilename = canvas2D.getAttribute('class')?.split('/').pop();

  // The image ID can be found by removing the file extension
  const imageId = imgFilename?.split('.')[0];

  const initImg: InitialImage = {
    imgFilename,
    imageId,
  };

  return initImg;
};

const getMarkerId = (): number | never => {
  // Extract the ID number of the element selected iff menu option is intersected

  // els[0].id exists since all entities that relate to being a marker also have a corresponding ID  associated with it

  // Regular Expression captures the digits associated with the ID
  const matches = els[0].id.match(/(\d+)/);

  // Parse the string to a number so the corresponding ID can be used
  // return +matches[0];
  if (matches) {
    return <number>+matches[0];
  }
  throw new Error(
    'It should never occur that a marker is intersected and it does not contain a corresponding ID'
  );
};

// TODO: consider breaking into set data and save data
const saveData = (markerId: number, coralBinary: CoralBinary) => {
  // Set the image ID
  const img = getImageFilenameAndId();
  const { imgFilename } = img;
  const imgId = img.imageId;

  // Determine the last annotated image
  const lastAnnotatedImage = allImages[allImages.length - 1];
  const lastImage = lastAnnotatedImage.imgId;

  // If the current image is not the same as the yet to be annotated image
  if (lastImage !== imgId) {
    // The last image has thus been annotated
    allImages[allImages.length - 1].isAnnotated = true;

    // Increment the last observation number
    // eslint-disable-next-line no-plusplus
    lastObservationNumber++;

    // If the annotated image is not the same as new image,
    // Add it to the array => this image is not yet annotated
    allImages.push({
      imgId,
      isAnnotated: false,
    });
  }

  const marker = <Entity>document.getElementById(`markerContainer${markerId}`);

  let data: Data;

  if (marker?.getAttribute('marked') === 'false') {
    const markerX = marker.getAttribute('position').x;
    const markerY = marker.getAttribute('position').y;

    // If marker has not yet been annotated set 'marked' to true
    // This will be used to identify if it is a POST or PUT request
    marker.setAttribute('marked', 'true');

    // Set POST data
    data = {
      image_id: imgId,
      image_file: imgFilename,
      site: +markerId,
      x: markerX,
      y: markerY,
      observation_number: lastObservationNumber + 1,
      observer: user,
      is_coral: coralBinary,
    };
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    postAnnotation(data);
  } else {
    // If annotation exists 'marked' => Set PUT data
    data = {
      image_id: imgId,
      observation_number: lastObservationNumber + 1,
      site: +markerId,
    };
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    updateAnnotation(data, coralBinary);
  }
};

const setLastObservationNumber = () => {
  // GET latest record observation number
  fetch('https://r2vr.herokuapp.com/annotated-image/last-observation-number', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Unable to retrieve last observation number!');
      }
      res.json().then((resJson) => {
        lastObservationNumber = resJson.observation_number;
      });
    })
    .catch((err) => {
      throw new Error(`${err} - Unable to retrieve last observation number!`);
    });
};

const postAnnotation = async (data: Data) => {
  try {
    const response = await fetch(
      'https://r2vr.herokuapp.com/annotated-image/post-response',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (![200, 201].includes(response.status)) {
      throw new Error('Unable to post annotation!');
    }

    setMarkerColor(data.site, <CoralBinary>data.is_coral);

    console.log('Request complete! response:', response, response.status);
  } catch (err) {
    throw new Error(`${err} - Unable to post annotation!`);
  }
};

const updateAnnotation = async (data: Data, coralBinary: CoralBinary) => {
  const annotatedMarker = document.getElementById(
    `markerCircumference${data.site}`
  );

  if (
    annotatedMarker?.getAttribute('color') === CORAL_COLOR &&
    coralBinary === 1
  ) {
    console.log('Coral is already selected!');
    return;
  }
  if (
    annotatedMarker?.getAttribute('color') === NOT_CORAL_COLOR &&
    coralBinary === 0
  ) {
    console.log('Not coral is already selected!');
    return;
  }

  try {
    const markerIdPromise = await fetch(
      'https://r2vr.herokuapp.com/annotated-image/find-marker-id',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // Note: 201 not included as no resource created from this POST
    if (![200].includes(markerIdPromise.status)) {
      throw new Error('Unable to find the ID of the corresponding marker!');
    }

    const markerIdJSONPromise = await markerIdPromise.json();

    const markerId = markerIdJSONPromise.id;

    const updateData = {
      is_coral: coralBinary,
      id: markerId,
    };

    const updatedResponse = await fetch(
      'https://r2vr.herokuapp.com/annotated-image/update-response',
      {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (![200].includes(updatedResponse.status)) {
      throw new Error('Unable to update annotation!');
    }
    setMarkerColor(data.site, updateData.is_coral);
    console.log('updatedResponse:', updatedResponse);
  } catch (err) {
    throw new Error(`${err} - Unable to update annotation`);
  }
};
