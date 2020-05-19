import { store } from './store/rootStore';

import { boundFetchLastObservationNumber } from './store/async/AsyncAction';
import boundIntersection from './store/intersection/IntersectionAction';

import handleMarkerIntersection from './intersections/marker';

const render = () => {
  const state = store.getState();
  const observationNumber = state.asyncReducer.observation_number;
  console.log(1, observationNumber);
};

boundFetchLastObservationNumber().then(() => console.log(123));

render();

store.subscribe(render);

// GLOBAL STATE

// [done] els
// isMarkerHovered
// selectedMarkerId
// image

// Handles an intersected annotation point
AFRAME.registerComponent('intersection', {
  /* eslint-disable-next-line func-names, object-shorthand */
  init: function () {
    // Listen for an intersection between the ray-caster and entities
    // eslint-disable-next-line consistent-return
    this.el.addEventListener('raycaster-intersection', (e: any) => {
      if (e) {
        if (e.detail.els.length < 3) {
          boundIntersection(e.detail.els);
        }
        handleMarkerIntersection();
      }
    });
  },
});

// import {
//   setMarkerColor,
//   CORAL_COLOR,
//   NOT_CORAL_COLOR,
// } from './UI/marker-color';

// import { CoralBinary, Data } from './declarations/data.d';
// import { Image, InitialImage } from './declarations/image.d';

// // Assign global variables for the user and initial image
// let user: string | undefined;
// let initialImage: InitialImage;

// // els: array of intersected entities => initialize to an empty array
// let els: Entity[] = [];

// // Stores the state of the image/s and there annotation status
// let allImages: Image[];

// // The last observation number will be retrieved async from the database
// let lastObservationNumber: number;

// // Determines the hover state and its ID of the marker of interest
// let isMarkerHovered = false;
// let selectedMarkerId: number;

// document.addEventListener('DOMContentLoaded', () => {
//   // eslint-disable-next-line @typescript-eslint/no-use-before-define
//   setLastObservationNumber();

//   // Get the user name entered in R once DOM loaded
//   user = document.getElementById('user')?.className;

//   // eslint-disable-next-line @typescript-eslint/no-use-before-define
//   initialImage = getImageFilenameAndId();

//   // Initial status is the initial image has not yet been annotated
//   allImages = [
//     {
//       imgId: initialImage.imageId,
//       isAnnotated: false,
//     },
//   ];
// });

// // Set the image filename for the image being annotated
// const getImageFilenameAndId = (): InitialImage => {
//   // Get the canvas that images will be rendered on
//   const canvas2D = <Entity>document.getElementById('canvas2d');

//   // The image filename is found through its class
//   // Note: the class will be updated when the next image is called via the R console through a websocket connection between R2VR and the browser

//   const imgFilename = canvas2D.getAttribute('class')?.split('/').pop();

//   // The image ID can be found by removing the file extension
//   const imageId = imgFilename?.split('.')[0];

//   const initImg: InitialImage = {
//     imgFilename,
//     imageId,
//   };

//   return initImg;
// };

// // TODO: consider breaking into set data and save data
// const saveData = (markerId: number, coralBinary: CoralBinary) => {
//   // Set the image ID
//   const img = getImageFilenameAndId();
//   const { imgFilename } = img;
//   const imgId = img.imageId;

//   // Determine the last annotated image
//   const lastAnnotatedImage = allImages[allImages.length - 1];
//   const lastImage = lastAnnotatedImage.imgId;

//   // If the current image is not the same as the yet to be annotated image
//   if (lastImage !== imgId) {
//     // The last image has thus been annotated
//     allImages[allImages.length - 1].isAnnotated = true;

//     // Increment the last observation number
//     // eslint-disable-next-line no-plusplus
//     lastObservationNumber++;

//     // If the annotated image is not the same as new image,
//     // Add it to the array => this image is not yet annotated
//     allImages.push({
//       imgId,
//       isAnnotated: false,
//     });
//   }

//   const marker = <Entity>document.getElementById(`markerContainer${markerId}`);

//   let data: Data;

//   if (marker?.getAttribute('marked') === 'false') {
//     const markerX = marker.getAttribute('position').x;
//     const markerY = marker.getAttribute('position').y;

//     // If marker has not yet been annotated set 'marked' to true
//     // This will be used to identify if it is a POST or PUT request
//     marker.setAttribute('marked', 'true');

//     // Set POST data
//     data = {
//       image_id: imgId,
//       image_file: imgFilename,
//       site: +markerId,
//       x: markerX,
//       y: markerY,
//       observation_number: lastObservationNumber + 1,
//       observer: user,
//       is_coral: coralBinary,
//     };
//     // eslint-disable-next-line @typescript-eslint/no-use-before-define
//     postAnnotation(data);
//   } else {
//     // If annotation exists 'marked' => Set PUT data
//     data = {
//       image_id: imgId,
//       observation_number: lastObservationNumber + 1,
//       site: +markerId,
//     };
//     // eslint-disable-next-line @typescript-eslint/no-use-before-define
//     updateAnnotation(data, coralBinary);
//   }
// };

// const setLastObservationNumber = () => {
//   // GET latest record observation number
//   fetch('https://r2vr.herokuapp.com/annotated-image/last-observation-number', {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//     },
//   })
//     .then((res) => {
//       if (res.status !== 200) {
//         throw new Error('Unable to retrieve last observation number!');
//       }
//       res.json().then((resJson) => {
//         lastObservationNumber = resJson.observation_number;
//       });
//     })
//     .catch((err) => {
//       throw new Error(`${err} - Unable to retrieve last observation number!`);
//     });
// };

// const postAnnotation = async (data: Data) => {
//   try {
//     const response = await fetch(
//       'https://r2vr.herokuapp.com/annotated-image/post-response',
//       {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     if (![200, 201].includes(response.status)) {
//       throw new Error('Unable to post annotation!');
//     }

//     setMarkerColor(data.site, <CoralBinary>data.is_coral);

//     console.log('Request complete! response:', response, response.status);
//   } catch (err) {
//     throw new Error(`${err} - Unable to post annotation!`);
//   }
// };

// const updateAnnotation = async (data: Data, coralBinary: CoralBinary) => {
//   const annotatedMarker = document.getElementById(
//     `markerCircumference${data.site}`
//   );

//   if (
//     annotatedMarker?.getAttribute('color') === CORAL_COLOR &&
//     coralBinary === 1
//   ) {
//     console.log('Coral is already selected!');
//     return;
//   }
//   if (
//     annotatedMarker?.getAttribute('color') === NOT_CORAL_COLOR &&
//     coralBinary === 0
//   ) {
//     console.log('Not coral is already selected!');
//     return;
//   }

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
//     setMarkerColor(data.site, updateData.is_coral);
//     console.log('updatedResponse:', updatedResponse);
//   } catch (err) {
//     throw new Error(`${err} - Unable to update annotation`);
//   }
// };
