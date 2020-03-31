// WebVR button handler: 2D coral cover
AFRAME.registerComponent('coral-cover-2d-buttons', {
  init: function() {
    // Select DOM element with button controls i.e. the scene
    let controlsEl = document.querySelector('[button-controls]');

    // Add event listener to the scene to detect buttons clicked in WebVR
    controlsEl.addEventListener('buttondown', () => {
      setImageId();

      // If button clicked and marker hovered => display menu options
      if (isMarkerHovered) {
        document.getElementById('menuCoral1').setAttribute('visible', true);
        document.getElementById('menuNotCoral1').setAttribute('visible', true);
      } else {
        // If button clicked but not hovering a marker => intersected elements not a marker thus not of interest hence and empty array is set
        els = [];
      }
    });
  }
});

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
  console.log('image_id: ', image_id);
};

//
initMarkers = () => {
  // Select all markers (invisible circle within container)
  const markers = document.querySelectorAll('.marker');

  // Init every marker with its own event listeners
  markers.forEach(marker => {
    // Check if posted i.e. marker already annotated
    let isPosted = false;

    // TODO:
    let markerX = marker.getAttribute('position').x;
    let markerY = marker.getAttribute('position').y;

    // Get ID number of marker i.e. marker1 => 1 (removes 'marker')
    const markerId = marker.id.replace('marker', '');

    // Select menu options based on the marker ID (to toggle visibility)
    const markerMenuCoral = document.querySelector(`#menuCoral${markerId}`);
    const markerMenuNotCoral = document.querySelector(
      `#menuNotCoral${markerId}`
    );
  });
};

// els: array of intersected entities => initialize to an empty
let els = [];

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
        isMarkerIntersected();
      }
    });
  }
});

// Determines the hover state of the marker of interest
let isMarkerHovered = false;

let isMenuHovered = false;

// Determines if the marker is hovered
isMarkerIntersected = () => {
  console.log('els', els);
  // Check if intersected element is the marker itself or a menu option
  if (
    els.some(
      el =>
        el.id === 'marker' ||
        el.id === 'markerCircumference1' ||
        el.id === 'menuCoral1' ||
        el.id === 'menuNotCoral1' ||
        el.id === 'coralText1' ||
        el.id === 'notCoralText1'
    )
  ) {
    // Note: Menu options made visible in 'coral-cover-2d-buttons' custom AFRAME component => requires a button to be pressed to show options
    isMarkerHovered = true;
  } else {
    isMarkerHovered = false;
    // If marker no longer hovered, menu options no longer need to be visible
    document.getElementById('menuCoral1').setAttribute('visible', false);
    document.getElementById('menuNotCoral1').setAttribute('visible', false);
  }
  console.log('isMarkerHovered: ', isMarkerHovered);
};
