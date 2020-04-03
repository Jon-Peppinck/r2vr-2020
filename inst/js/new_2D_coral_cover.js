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

// WebVR button handler: 2D coral cover
AFRAME.registerComponent('coral-cover-2d-buttons', {
  init: function() {
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
  }
});

// Handles an intersected annotation point
AFRAME.registerComponent('intersection', {
  init: function() {
    // Listen for an intersection between the ray-caster and entities
    this.el.addEventListener('raycaster-intersection', e => {
      if (e) {
        // In the event an intersection occurs => set the array of intersection elements
        els = e.detail.els;

        // Expecting: `#markerCircumference${x}` and/or `#marker${x}`
        // TODO: Check for points near each other => make points unable to overlap
        if (els.length > 2) {
          return (els = []);
        }
        // Determine if the marker is intersected iff expected result occurred
        handleMarkerIntersection();
      }
    });
  }
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
  let markerId = getMarkerId();
  // // Check if intersected element is the marker itself or a menu option
  if (
    els.some(
      el =>
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
      el => el.id === `menuCoral${markerId}` || el.id === `coralText${markerId}`
    )
  ) {
    // TODO: implement HTTP request
    // Update UI color to indicate coral is selected
    document
      .getElementById(`markerCircumference${markerId}`)
      .setAttribute('color', CORAL_COLOR);

    // Hide menu options
    displayMenuOptions(markerId);

    // Set the image ID
    setImageId();
  }
};

isNotCoralIntersected = () => {
  // Get the marker id number for the selected marker

  let markerId = getMarkerId();

  // If an intersected entity is the not coral menu
  if (
    els.some(
      el =>
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

    // Set the image ID
    setImageId();
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

// Set the image ID for the image being annotated
setImageId = () => {
  // Get the canvas that images will be rendered on
  const canvas_2d = document.getElementById('canvas2d');

  // The image file is found through its class
  // Note: the class will be updated when the next image is called
  let image_file = canvas_2d
    .getAttribute('class')
    .split('/')
    .pop();

  // The image ID can be found by removing the file extension
  let image_id = image_file.split('.')[0];
};

getMarkerId = () => {
  // Extract the ID number of the element selected iff coral menu option is intersected

  // els[0].id exists since all entities that relate to being a marker also have a corresponding ID  associated with it

  // Regular Expression captures the digits associated with the ID
  let matches = els[0].id.match(/(\d+)/);

  // Parse the string to a number so the corresponding ID can be used
  return +matches[0];
};
