import { Scene, Entity } from 'aframe';

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
// import handleEvaluationIntersection from './intersections/evaluation';

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
          // handleEvaluationIntersection();
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
      // TODO: Refactor below

      const lastHoveredEl = state.intersectionReducer[0];
      if (lastHoveredEl) {
        selectEvaluationResponse(lastHoveredEl.id);
      }
      // TODO: Refactor above

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
// TODO: Refactor below
let selectedOption: string;

function selectEvaluationResponse(id: string) {
  if (['option1Plane', 'option1Text'].includes(id)) {
    console.log('option 1 selected');
    selectedOption = 'option1Plane';
    document.getElementById('option1Plane')!.setAttribute('color', 'green');
  } else if (['option2Plane', 'option2Text'].includes(id)) {
    console.log('option 2 selected');
    selectedOption = 'option2Plane';
    document.getElementById('option2Plane')!.setAttribute('color', 'green');
  } else if (['option3Plane', 'option3Text'].includes(id)) {
    console.log('option 3 selected');
    selectedOption = 'option3Plane';
    document.getElementById('option3Plane')!.setAttribute('color', 'green');
  } else if (['option4Plane', 'option4Text'].includes(id)) {
    console.log('option 4 selected');
    selectedOption = 'option4Plane';
    document.getElementById('option4Plane')!.setAttribute('color', 'green');
  } else if (['postPlane', 'postText'].includes(id)) {
    console.log('Post selected');
    saveEvaluation(selectedOption);
  }
}

// TODO: make dynamic
const saveEvaluation = (postResponse: string) => {
  const postPlane = <Entity>document.getElementById(`postPlane`)!;

  let data: any;

  let evaluationResponse: string;

  if (postResponse === 'option1Plane') {
    evaluationResponse = 'Unable to use';
  } else if (postResponse === 'option2Plane') {
    evaluationResponse = 'Major difficulty';
  } else if (postResponse === 'option3Plane') {
    evaluationResponse = 'Minor difficulty';
  } else {
    evaluationResponse = 'No difficulty';
  }

  if (postPlane.getAttribute('annotated') === 'false') {
    postPlane.setAttribute('annotated', 'true');
    console.log('POST');
    data = {
      observer: 'Harry',
      question:
        'Indicate your difficulty using the system to annotate 2D images?',
      response: evaluationResponse,
    };
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    postEvaluation(data);
  } else {
    console.log('PUT');
    data = {
      observer: 'Harry',
      response: evaluationResponse,
    };
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //  updateResponse(data);
  }
};

const postEvaluation = async (data: any) => {
  try {
    const response = await fetch('https://r2vr.herokuapp.com/evaluation', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (![200, 201].includes(response.status)) {
      throw new Error('Unable to post annotation!');
    }
    document.getElementById('postPlane')!.setAttribute('color', 'green');
    console.log('Request complete! response:', response, response.status);
  } catch (err) {
    throw new Error(`${err} - Unable to post annotation!`);
  }
};

// const updateEvaluation = async (
//   data: any
// ) => {
//   const annotatedMarker = document.getElementById(
//     `markerCircumference${data.site}`
//   );

//   try {
//     const markerIdPromise = await fetch(
//       'https://r2vr.herokuapp.com/annotated-image/find-marker-id',
//       {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     // Note: 201 not included as no resource created from this POST
//     if (![200].includes(markerIdPromise.status)) {
//       throw new Error('Unable to find the ID of the corresponding marker!');
//     }

//     const markerIdJSONPromise = await markerIdPromise.json();

//     const markerId = markerIdJSONPromise.id;

//     const updateData = {
//       is_coral: coralBinary,
//       id: markerId,
//     };

//     const updatedResponse = await fetch(
//       'https://r2vr.herokuapp.com/annotated-image/update-response',
//       {
//         method: 'PUT',
//         body: JSON.stringify(updateData),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     if (![200].includes(updatedResponse.status)) {
//       throw new Error('Unable to update annotation!');
//     }
//     console.log('updatedResponse:', updatedResponse);
//   } catch (err) {
//     throw new Error(`${err} - Unable to update annotation`);
//   }
// };
