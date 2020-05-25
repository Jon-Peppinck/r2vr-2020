import { store } from '../store/rootStore';

import boundMarkerIntersection from '../store/marker/MarkerAction';

import selectMenuOption from './menu-options';

// Determines if the marker is hovered
const handleMarkerIntersection = (): void => {
  const { observationReducer, intersectionReducer } = store.getState();

  // Prevents annotation points being marked if missing observation_number data
  const observationNumber = observationReducer.observation_number;

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
    const markerId = <number>+matches[0];

    boundMarkerIntersection({ id: markerId, isHovered: true });
    selectMenuOption();
  }
};

export default handleMarkerIntersection;
