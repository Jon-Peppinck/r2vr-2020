import { Scene, Entity } from 'aframe';

import { store } from './store/rootStore';
import {
  boundPushNewImage,
  boundPostAnnotation,
  boundUpdateAnnotation,
} from './store/annotation/AnnotationAction';
import boundGetUser from './store/user/UserAction';
import boundGetMetaData from './store/metadata/MetaDataAction';

import { getImage, imageObserver } from './helpers/image';
import getMarkerIndex from './helpers/findMarkerIndex';

import { setMarkerColor } from '../shared/user-interface/marker-color';
import displayMenuOptions from '../shared/user-interface/menu-options';

let intersectedElId = '';

const render = () => {
  return store.getState();
};
render();
store.subscribe(render);

document.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('user')!.className;
  const user = {
    name,
  };
  boundGetUser(user);
  const metaData = document.getElementById('metaData')!.className;
  const moduleAndType = metaData.split('/');
  const [module, annotationType] = moduleAndType as [
    Shared.MetaDataModule,
    Shared.MetaDataAnnotationType
  ];
  boundGetMetaData({ module, annotationType });
  const initialImage = getImage();
  boundPushNewImage(initialImage);
  imageObserver();
});

AFRAME.registerComponent('raycaster-listen', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', (e: any) => {
      let { x, y, z } = e.detail.intersection.point;
      if ([x, y, z].every((coordinate) => coordinate === 0)) return;
      intersectedElId = e.currentTarget.id;
      if (!intersectedElId) return;
      const matches = intersectedElId.match(/(\d+)/);
      if (matches) {
        const id = +matches[0];
        const isMenuOptionSelected = [
          `menuCoral${id}`,
          `menuNotCoral${id}`,
        ].includes(intersectedElId);

        if (!isMenuOptionSelected) return;
        displayMenuOptions(id, 'hide');

        let marker: Shared.Marker;

        const markerContainer = document.getElementById(
          `markerContainer${id}`
        )! as Entity;
        const x = markerContainer.getAttribute('position').x;
        const y = markerContainer.getAttribute('position').y;
        const z = markerContainer.getAttribute('position').y;

        const foundIndex = getMarkerIndex(id);

        if (intersectedElId.startsWith('menuCoral')) {
          setMarkerColor(id, 1);
          marker = { id, isCoral: 1, x, y, z };
        } else {
          setMarkerColor(id, 0);
          marker = { id, isCoral: 0, x, y, z };
        }

        foundIndex === -1
          ? boundPostAnnotation(marker)
          : boundUpdateAnnotation(marker);
      }
    });
    this.el.addEventListener('raycaster-intersected-cleared', () => {
      if (intersectedElId === '') return;
      intersectedElId = '';
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

/* WebSocket */

AFRAME.registerComponent('r2vr-message-router', {
  schema: {
    host: { type: 'string', default: 'localhost' },
    port: { type: 'number', default: 8080 },
  },

  init: function () {
    var ws = new WebSocket('ws://' + this.data.host + ':' + this.data.port);

    ws.onopen = function () {
      console.log(
        'r2vr-message-router: Established connection with server session.'
      );
    };

    ws.onmessage = function (msg: any) {
      console.log(msg);
      const payload = JSON.parse(msg.data);
      // Assume payload is a list of events
      payload.map((r2vr_message: any) => {
        let target = <any>'';
        if (r2vr_message.id) {
          target = <Entity>document.querySelector('#' + r2vr_message.id);
          console.log(77, target, r2vr_message.id);
        }
        if (r2vr_message.class == 'event') {
          target.emit(
            r2vr_message.message.eventName,
            r2vr_message.message.eventDetail,
            r2vr_message.message.bubbles
          );
        } else if (r2vr_message.class == 'update') {
          console.log(555, target, r2vr_message.id, r2vr_message.component);
          target.setAttribute(
            r2vr_message.component,
            r2vr_message.attributes,
            r2vr_message.replaces_component
          );
        } else if (r2vr_message.class == 'remove_component') {
          target.removeAttribute(r2vr_message.component);
        } else if (r2vr_message.class == 'remove_entity') {
          target.removeFromParent();
          target.parentNode.removeChild(target);
        } else if (r2vr_message.class == 'remove_entity_class') {
          var els = <any>(
            document.getElementsByClassName(`${r2vr_message.className}`)
          );
          if (els.length === 0) {
            throw new Error(
              `${r2vr_message.className} does not pertain to the class of any DOM elements.`
            );
          }
          while (els[0]) {
            els[0].parentNode.removeChild(els[0]);
          }
        } else if (r2vr_message.class == 'add_entity') {
          console.log(r2vr_message.tag);
          const validEntities = [
            'box',
            'camera',
            'circle',
            'cone',
            'cursor',
            'curvedimage',
            'cylinder',
            'dodecahedron',
            'gltf-model',
            'icosahedron',
            'image',
            'light',
            'link',
            'obj-model',
            'octahedron',
            'plane',
            'ring',
            'sky',
            'sound',
            'sphere',
            'tetrahedron',
            'text',
            'torus-knot',
            'torus',
            'triangle',
            'video',
            'videosphere',
          ];
          const isValidEntity = validEntities.includes(r2vr_message.tag);
          if (!isValidEntity) {
            throw new Error(
              `${r2vr_message.tag} is not a primitive A-Frame entity.`
            );
          }
          var parentEl = <any>document.querySelector('a-scene');
          if (r2vr_message.parentEntityId) {
            parentEl = document.querySelector(
              `#${r2vr_message.parentEntityId}`
            );
          }
          if (!parentEl) {
            throw new Error(
              `${r2vr_message.parentEntityId} does not pertain to the ID of a DOM element.`
            );
          }
          var entityEl = document.createElement(`a-${r2vr_message.tag}`);
          console.log(entityEl);
          entityEl.id = r2vr_message.id;
          if (r2vr_message.className) {
            entityEl.classList.add(`${r2vr_message.className}`);
          }
          parentEl.appendChild(entityEl);
        } else {
          throw new Error(
            'r2vr-message-router received a message of unknown class.'
          );
        }
      });
    };
    function handle_r_server_message(event: any) {
      ws.send(event.detail);
    }

    this.el.addEventListener('r_server_message', handle_r_server_message);
  },
});
