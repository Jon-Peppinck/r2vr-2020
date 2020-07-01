// import { store } from '../store/rootStore';

// import boundMarkerIntersection from '../store/marker/MarkerAction';

// // Determines if an evaluation response is hovered
// const handleEvaluationIntersection = (): void => {
//   const { observationReducer, intersectionReducer } = store.getState();

//   // Prevents annotation points being marked if missing observation_number data
//   const observationNumber = observationReducer.observation_number;

//   // TODO: check markers on edge
//   if (
//     [0, -1].includes(observationNumber) ||
//     intersectionReducer[0]?.id === 'canvas2d' ||
//     intersectionReducer.length === 0
//   )
//     return;

//   const intersectedElId = intersectionReducer[0].id;

//   if (['option1Plane', 'option1Text'].includes(intersectedElId)) {
//     console.log('option 1 selected');
//     // boundMarkerIntersection({ id: markerId });
//   } else if (['option2Plane', 'option2Text'].includes(intersectedElId)) {
//     console.log('option 2 selected');
//   } else if (['option3Plane', 'option3Text'].includes(intersectedElId)) {
//     console.log('option 3 selected');
//   } else if (['option4Plane', 'option4Text'].includes(intersectedElId)) {
//     console.log('option 4 selected');
//   } else if (['PostPlane', 'PostText'].includes(intersectedElId)) {
//     console.log('Post selected');
//   }
// };

// export default handleEvaluationIntersection;
