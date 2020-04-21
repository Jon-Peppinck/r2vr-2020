import { Entity, Scene } from 'aframe';

import { CoralBinary, Data } from './declarations/data';
import { Image, InitialImage } from './declarations/image';

// Assign global variables for the user and initial image
let user: string | undefined;
let initialImage: InitialImage;

// Choose colors of menu options
const CORAL_COLOR = '#FF95BC';
const NOT_CORAL_COLOR = '#969696';

// els: array of intersected entities => initialize to an empty array
let els: Entity[] = []; // TODO: find type

// Stores the state of the image/s and there annotation status
let allImages: Image[];

// The last observation number will be retrieved async from the database
let lastObservationNumber: number;

// Determines the hover state and its ID of the marker of interest
let isMarkerHovered = false;
let selectedMarkerId: number;

document.addEventListener('DOMContentLoaded', () => {
  setLastObservationNumber();

  // Get the user name entered in R once DOM loaded
  user = document.getElementById('user')?.className;

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
  init: function () {
    // Select DOM element with button controls i.e. the scene
    let controlsEl = <Scene>document.querySelector('[button-controls]');

    // Detect buttons selected in WebVR
    controlsEl.addEventListener('buttondown', () => {
      // If button selected and marker hovered => display menu options
      if (isMarkerHovered) {
        // Marker is hovered thus must have a corresponding ID
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
  init: function () {
    // Listen for an intersection between the ray-caster and entities
    this.el.addEventListener('raycaster-intersection', (e: any) => {
      if (e) {
        // In the event an intersection occurs => set the array of intersection elements
        els = e.detail.els;

        // TODO: Check comment
        // Expecting: `#markerCircumference${x}` and/or `#marker${x}`
        // TODO: Check for points near each other => make points unable to overlap
        if (els.length > 2) {
          return (els = []);
        }
        // Determine if the marker is intersected iff expected result occurred
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
    isCoralIntersected();
    isNotCoralIntersected();
  } else {
    // Marker no longer hovered
    isMarkerHovered = false;

    // Menu options no longer need to be visible
    displayMenuOptions(markerId);
  }
};

// TODO: Refactor isCoralIntersected and isNotCoralIntersected into isMenuOptionIntersected
const isCoralIntersected = (): void => {
  // Get the marker id number for the selected marker
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
    saveData(markerId, 1);

    // Hide menu options
    displayMenuOptions(markerId);
  }
};

const isNotCoralIntersected = (): void => {
  // Get the marker id number for the selected marker

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
    saveData(markerId, 0);

    // Hide menu options
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
  let matches = els[0].id.match(/(\d+)/);

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
  const imgFilename = img.imgFilename;
  const imgId = img.imageId;

  // Determine the last annotated image
  const lastAnnotatedImage = allImages[allImages.length - 1];
  const lastImage = lastAnnotatedImage.imgId;

  // If the current image is not the same as the yet to be annotated image
  if (lastImage !== imgId) {
    // The last image has thus been annotated
    allImages[allImages.length - 1].isAnnotated = true;

    // Increment the last observation number
    lastObservationNumber++;

    // If the annotated image is not the same as new image,
    // Add it to the array => this image is not yet annotated
    allImages.push({
      imgId: imgId,
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

    postAnnotation(data);
  } else {
    // If annotation exists 'marked' => Set PUT data
    data = {
      image_id: imgId,
      observation_number: lastObservationNumber + 1,
      site: +markerId,
    };

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
      res.json().then((res) => {
        lastObservationNumber = res.observation_number;
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
  let annotatedMarker = document.getElementById(
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
    let markerIdPromise = await fetch(
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

    let markerIdJSONPromise = await markerIdPromise.json();

    let markerId = markerIdJSONPromise.id;

    let updateData = {
      is_coral: coralBinary,
      id: markerId,
    };

    let updatedResponse = await fetch(
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

const setMarkerColor = (marker: number, coralBinary: CoralBinary) => {
  // Select corresponding Marker Circumference from DOM
  let markerCircumference = document.getElementById(
    `markerCircumference${marker}`
  );
  // Set appropriate color
  coralBinary === 1
    ? markerCircumference?.setAttribute('color', CORAL_COLOR)
    : markerCircumference?.setAttribute('color', NOT_CORAL_COLOR);
};
