import { Scene } from 'aframe';

import { displayMenuOptions } from '../user-interface/menu-options';

// WebVR button handler: 2D coral cover
AFRAME.registerComponent('coral-cover-2d-buttons', {
  /* eslint-disable-next-line func-names, object-shorthand */
  init: function () {
    // Select DOM element with button controls i.e. the scene
    const controlsEl = <Scene>document.querySelector('[button-controls]');

    // Detect buttons selected in WebVR
    controlsEl.addEventListener('buttondown', () => {
      // If button selected and marker hovered => display menu options
      // TODO: isMarkerHovered STATE
      if (isMarkerHovered) {
        // Marker is hovered thus must have a corresponding ID
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        // TODO: selectedMarkerId STATE
        displayMenuOptions(selectedMarkerId, true);
      } else {
        // If button clicked but not hovering a marker => intersected elements not a marker thus not of interest hence and empty array is set
        // TODO: els STATE
        els = [];
      }
    });
  },
});
