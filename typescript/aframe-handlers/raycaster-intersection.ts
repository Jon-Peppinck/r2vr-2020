// NOTE: Perhaps better to handle AFRAME handlers from index.ts

// import handleMarkerIntersection from '../intersections/marker';

// // Handles an intersected annotation point
// const raycasterIntersectionHandler = AFRAME.registerComponent('intersection', {
//   /* eslint-disable-next-line func-names, object-shorthand */
//   init: function () {
//     // Listen for an intersection between the ray-caster and entities
//     // eslint-disable-next-line consistent-return
//     this.el.addEventListener('raycaster-intersection', (e: any) => {
//       if (e) {
//         // In the event an intersection occurs => set the array of intersection elements
//         els = e.detail.els;

//         // TODO: Check comment
//         // Expecting: `#markerCircumference${x}` and/or `#marker${x}`
//         // TODO: Check for points near each other => make points unable to overlap
//         if (els.length > 2) {
//           els = [];
//           return els;
//         }
//         // Determine if the marker is intersected iff expected result occurred
//         // eslint-disable-next-line @typescript-eslint/no-use-before-define
//         // TODO add
//         handleMarkerIntersection();
//       }
//     });
//   },
// });

// export default raycasterIntersectionHandler;
