import { Scene } from 'aframe';

import { store } from './store/rootStore';

import {
  boundFetchLastObservationNumber,
  boundIncrementObservationNumber,
} from './store/observation/ObservationAction';
import boundGetImage from './store/image/ImageAction';
import boundGetUser from './store/user/UserAction';
import boundIntersection from './store/intersection/IntersectionAction';

import { Image } from './store/image/models/Image';
import { User } from './store/user/models/User';

import getImage from './helpers/image';

import displayMenuOptions from './user-interface/menu-options';
import handleMarkerIntersection from './intersections/marker';

// Observe canvas for image changes
document.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('user')!.className;
  const user = {
    name,
  };
  boundGetUser(user);
  const initialImage: Image = getImage();
  boundGetImage(initialImage);

  const mutationObserver = new MutationObserver(() => {
    const newImage: Image = getImage();
    boundGetImage(newImage);
    boundIncrementObservationNumber();
  });

  mutationObserver.observe(document.getElementById('canvas2d')!, {
    attributes: true,
    attributeFilter: ['src'],
  });
});

const render = () => {
  return store.getState();
};

boundFetchLastObservationNumber().then(() => boundIncrementObservationNumber());

render();

store.subscribe(render);

// Handles an intersected annotation point
AFRAME.registerComponent('intersection', {
  /* eslint-disable-next-line func-names, object-shorthand */
  init: function () {
    // Listen for an intersection between the ray-caster and entities
    this.el.addEventListener('raycaster-intersection', (e: any) => {
      if (e) {
        if (e.detail.els.length < 3) {
          boundIntersection(e.detail.els);
          handleMarkerIntersection();
        }
      }
    });
  },
});

AFRAME.registerComponent('coral-cover-2d-buttons', {
  /* eslint-disable-next-line func-names, object-shorthand */
  init: function () {
    // Select DOM element with button controls i.e. the scene
    const controlsEl = <Scene>document.querySelector('[button-controls]');

    // Detect buttons selected in WebVR
    controlsEl.addEventListener('buttondown', () => {
      // If button selected and marker hovered => display menu options
      const state = store.getState();
      const { id, isHovered } = state.markerReducer;

      if (isHovered) {
        // Marker is hovered thus must have a corresponding ID
        displayMenuOptions(id, true);
      } else {
        // If button clicked but not hovering a marker => intersected elements not a marker thus not of interest hence and empty array is set
        boundIntersection([]);
      }
    });
  },
});
