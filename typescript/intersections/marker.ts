import { store } from '../store/rootStore';

// import getMarkerId from '../helper/marker';

// Determines if the marker is hovered
const handleMarkerIntersection = (): void => {
  const { asyncReducer, intersectionReducer } = store.getState();

  // Prevents annotation points being marked if missing observation_number data
  const observationNumber = asyncReducer.observation_number;

  // TODO: check markers on edge
  if (
    [0, -1].includes(observationNumber) ||
    intersectionReducer[0]?.id === 'canvas2d' ||
    intersectionReducer.length === 0
  )
    return;

  const matches = intersectionReducer[0].id.match(/(\d+)/);

  // Parse the string to a number so the corresponding ID can be used
  // return +matches[0];
  if (matches) {
    // TODO: ACTION to set global state for intersected marker ID;
    const markerId = <number>+matches[0];
    console.log(8, 'marker ID: ', markerId);
  }

  // const xxx = getMarkerId();

  // const markerId = getMarkerId();
  // console.log(727, markerId);
  // // Get the marker ID number for the intersected marker
  // // eslint-disable-next-line @typescript-eslint/no-use-before-define
  // const markerId = getMarkerId();

  // // // Check if intersected element is the marker itself or a menu option
  // if (
  //   els.some(
  //     (el: Entity) =>
  //       el.id === `marker${markerId}` ||
  //       el.id === `markerCircumference${markerId}` ||
  //       el.id === `menuCoral${markerId}` ||
  //       el.id === `menuNotCoral${markerId}` ||
  //       el.id === `coralText${markerId}` ||
  //       el.id === `notCoralText${markerId}`
  //   )
  // ) {
  //   // Note: Menu options made visible in 'coral-cover-2d-buttons' custom AFRAME component => requires a button to be pressed to show options
  //   isMarkerHovered = true;

  //   // Check if a menu option is intersected
  //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //   isCoralIntersected();
  //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //   isNotCoralIntersected();
  // } else {
  //   // Marker no longer hovered
  //   isMarkerHovered = false;

  //   // Menu options no longer need to be visible
  //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //   displayMenuOptions(markerId);
};

export default handleMarkerIntersection;
