import { Scene } from 'aframe';

import displayMenuOptions from './user-interface/menu-options';

let intersectedElId = '';

AFRAME.registerComponent('raycaster-listen', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', (e: any) => {
      let { x, y, z } = e.detail.intersection.point;
      if ([x, y, z].every((coordinate) => coordinate === 0)) return;
      intersectedElId = e.currentTarget.id;
      if (!intersectedElId) return;
      let matches = intersectedElId.match(/(\d+)/);
      if (matches) {
        const id = +matches[0];
        displayMenuOptions(id, 'hide');
      }
    });
    this.el.addEventListener('raycaster-intersected-cleared', () => {
      if (intersectedElId === '') return;
      intersectedElId = '';
      console.log(2, 'intersected-cleared', intersectedElId);
    });
  },
});

AFRAME.registerComponent('toggle-menu-listen', {
  init: function () {
    const controlsEl = document.querySelector('[button-controls]') as Scene;
    controlsEl.addEventListener('buttondown', () => {
      let matches = intersectedElId.match(/(\d+)/);
      if (matches) {
        const id = +matches[0];
        const isMarkerIntersected = [
          `markerInner${id}`,
          `markerBoundary${id}`,
        ].includes(intersectedElId);
        if (isMarkerIntersected) {
          displayMenuOptions(id, 'show');
        }
      }
    });
  },
});
