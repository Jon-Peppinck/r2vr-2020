// Determines the hover state of the marker of interest
let isMarkerHovered = false;

// Determines if the coral option is selected
let isCoralSelected = false;

// Determines if the not coral option is selected
let isNotCoralSelected = false;

// els: array of intersected entities => initialize to an empty array
let els = [];

// Choose colors of menu options
const CORAL_COLOR = '#FF95BC';
const NOT_CORAL_COLOR = '#969696';

// Assign a global variable for the id for the selected marker so it is in scope for the AFRAME registered component
let selectedMarkerId;

// Assign a global variable for the user
let user;

// Assign a global variable for the initial image
let initialImage;

// TODO: consider declaring multiple variables
let lastObservationNumber;

// TODO: comment
let allImages;

// TODO comment
let hasLastObservationNumberBeenRetrieved = false;

// Get the user name entered in R once DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  user = document.getElementById('user').className;
  initialImage = getImageFilenameAndId();
  // TODO: comment
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
    let controlsEl = document.querySelector('[button-controls]');

    // Add event listener to the scene to detect buttons clicked in WebVR
    controlsEl.addEventListener('buttondown', () => {
      // If button clicked and marker hovered => display menu options
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
    this.el.addEventListener('raycaster-intersection', (e) => {
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

// TODO: implement
// initMarkers = () => {
//   // Select all markers (invisible circle within container)
//   const markers = document.querySelectorAll('.marker');

//   // Init every marker with its own event listeners
//   markers.forEach(marker => {
//     // Check if posted i.e. marker already annotated
//     let isPosted = false;

//     // TODO:
//     let markerX = marker.getAttribute('position').x;
//     let markerY = marker.getAttribute('position').y;

//     // Get ID number of marker i.e. marker1 => 1 (removes 'marker')
//     const markerId = marker.id.replace('marker', '');

//     // Select menu options based on the marker ID (to toggle visibility)
//     const markerMenuCoral = document.querySelector(`#menuCoral${markerId}`);
//     const markerMenuNotCoral = document.querySelector(
//       `#menuNotCoral${markerId}`
//     );
//   });
// };

// Determines if the marker is hovered
handleMarkerIntersection = () => {
  // Get the marker ID number for the intersected marker
  let markerId = getMarkerId();

  console.log('Last intersected element ID', els[0].id); // rm

  els[0].id.replace(els[0].id, markerId);

  // // Check if intersected element is the marker itself or a menu option
  if (
    els.some(
      (el) =>
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

    // Determine if the the coral option is selected
    isCoralIntersected();

    // Determine if the not coral option is selected
    isNotCoralIntersected();
  } else {
    // Marker no longer hovered
    isMarkerHovered = false;

    // Menu options no longer need to be visible
    displayMenuOptions(markerId);
  }
};

isCoralIntersected = () => {
  // Get the marker id number for the selected marker
  let markerId = getMarkerId();

  // Set the global selected marker ID
  selectedMarkerId = markerId;

  // If an intersected entity is the coral menu
  if (
    els.some(
      (el) =>
        el.id === `menuCoral${markerId}` || el.id === `coralText${markerId}`
    )
  ) {
    // TODO: implement HTTP request

    //

    // Save annotation to database: isCoral = 1 (coral)
    saveData(markerId, 1);

    // get data needed to POST or PUT

    // fetch: GET latest record observation number

    // get markerX and markerY for the point
    // let markerX = marker.getAttribute('position').x;
    // let markerY = marker.getAttribute('position').y;

    // image ID
    // image file
    // observer

    // is_coral

    // Update UI color to indicate coral is selected
    document
      .getElementById(`markerCircumference${markerId}`)
      .setAttribute('color', CORAL_COLOR);

    // Hide menu options
    displayMenuOptions(markerId);
  }
};

// TODO: potentially not set color until after HTTP request completes
isNotCoralIntersected = () => {
  // Get the marker id number for the selected marker

  let markerId = getMarkerId();

  // If an intersected entity is the not coral menu
  if (
    els.some(
      (el) =>
        el.id === `menuNotCoral${markerId}` ||
        el.id === `notCoralText${markerId}`
    )
  ) {
    // TODO: implement HTTP request
    // Update UI color to indicate not coral is selected
    document
      .getElementById(`markerCircumference${markerId}`)
      .setAttribute('color', NOT_CORAL_COLOR);

    // Hide menu options
    displayMenuOptions(markerId);
  }
};

displayMenuOptions = (id, bool = false) => {
  if (bool) {
    // Menu options are now visible
    document.getElementById(`menuCoral${id}`).setAttribute('visible', true);
    document.getElementById(`menuNotCoral${id}`).setAttribute('visible', true);
  } else {
    // Marker no longer hovered
    isMarkerHovered = false;

    // Menu options no longer need to be visible
    document.getElementById(`menuCoral${id}`).setAttribute('visible', false);
    document.getElementById(`menuNotCoral${id}`).setAttribute('visible', false);
  }
};

// Set the image filename for the image being annotated
getImageFilenameAndId = () => {
  // Get the canvas that images will be rendered on
  const canvas2D = document.getElementById('canvas2d');

  // The image filename is found through its class
  // Note: the class will be updated when the next image is called
  let imageFilename = canvas2D.getAttribute('class').split('/').pop();

  // TODO: set image_file and image_id globally

  // The image ID can be found by removing the file extension
  let imageId = imageFilename.split('.')[0];

  // return both the imageFilename and the image ID
  return {
    imageFilename,
    imageId,
  };
};

getMarkerId = () => {
  // Extract the ID number of the element selected iff menu option is intersected

  // els[0].id exists since all entities that relate to being a marker also have a corresponding ID  associated with it

  // Regular Expression captures the digits associated with the ID
  let matches = els[0].id.match(/(\d+)/);

  // Parse the string to a number so the corresponding ID can be used
  return +matches[0];
};

// // //

// increment observation number if new image

// TODO: consider breaking into set data and save data
saveData = async (markerId, coralBinary) => {
  if (!hasLastObservationNumberBeenRetrieved) {
    lastObservationNumber = await setLastObservtionNumber();
    hasLastObservationNumberBeenRetrieved = true;
  }

  // Set the image ID
  let img = getImageFilenameAndId();
  let imgFilename = img.imageFilename;
  let imgId = img.imageId;

  let lastAnnotatedImage = allImages[allImages.length - 1];
  console.log('last annotated image: ', lastAnnotatedImage); // rm
  let lastImage = lastAnnotatedImage.imgId;
  let isLastImageAnnotated = lastAnnotatedImage.isAnnotated;

  if (lastImage !== imgId) {
    // the last image has thus been annotated
    allImages[allImages.length - 1].isAnnotated = true;

    // increment the last observation number
    lastObservationNumber++;

    // if the annotated image is not the same as new image
    // add it to the array => this image is not yet annotated
    allImages.push({
      imgId: imgId,
      isAnnotated: false,
    });
    console.log('allImages: ', allImages);
  }

  let marker = document.getElementById(`markerCircumference${markerId}`);

  let markerX = marker.getAttribute('position').x;
  let markerY = marker.getAttribute('position').y;

  console.log(
    marker.getAttribute('marked'),
    typeof marker.getAttribute('marked')
  );

  let data;

  if (marker.getAttribute('marked') === 'false') {
    // TODO: POST
    console.log('not marked');
    marker.setAttribute('marked', true);
    // set data
    data = {
      image_id: imgId,
      image_file: imgFilename,
      site: +markerId,
      x: markerX,
      y: markerY,
      observation_number: lastObservationNumber + 1, // TODO CHECK
      observer: user,
      is_coral: coralBinary,
    };
    console.log('data: ', data);
  } else {
    // TODO PUT
    console.log('is marked');
    // set data
    dataForMarkerId = {
      image_id: imgId,
      observation_number: lastObservationNumber + 1,
      site: +markerId,
    };
    console.log('data: ', data);
  }

  // DATA
  // console.log('saving coral annotation...');
  // console.log('isCoral: ', coralBinary);
  // console.log('markerId: ', markerId);
  // let marker = document.getElementById(`markerContainer${markerId}`);
  // let markerX = marker.getAttribute('position').x;
  // let markerY = marker.getAttribute('position').y;
  // console.log(`X: ${markerX}, Y: ${markerY}`);
  // console.log('user: ', user);
  // console.log('initimg: ', initialImage);
  // END DATA

  // // PUT data: If marker already annotated and coral selected
  // let dataForMarkerId = {
  //   image_id: image_id,
  //   observation_number: last_observation_number + 1,
  //   site: +markerId
  // };
  // // POST data: If not annotated then coral selected
  // // PUT if marker already annotated else POST
  // if (isPosted && (coralSelected || notCoralSelected)) {
  //   console.log('PUT');
  //   // If annotation exists, get its ID
  //   fetch('http://localhost:3000/get-marker-id', {
  //     method: 'POST',
  //     body: JSON.stringify(dataForMarkerId),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => {
  //       res.json().then(res => {
  //         let updateMarker = {
  //           is_coral: coralBinary,
  //           id: res[0].id
  //         };
  //         // Update annotation with ID so marker is coral
  //         fetch('http://localhost:3000/update-annotation', {
  //           method: 'PUT',
  //           body: JSON.stringify(updateMarker),
  //           headers: {
  //             'Content-Type': 'application/json'
  //           }
  //         })
  //           .then(res => {
  //             console.log('Updated annotation', res);
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // } else {
  //   isPosted = true;
  //   console.log('POST');
  //   fetch('http://localhost:3000/gs', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => {
  //       console.log('Request complete! response:', res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
};

setLastObservtionNumber = () => {
  // GET latest record observation number
  fetch('http://localhost:8080/annotated-image/last-observation-number', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      res.json().then((res) => {
        lastObservationNumber = res.observation_number;
        console.log('last ob number: ', lastObservationNumber);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
