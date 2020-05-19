import { Entity } from 'aframe';

import { displayMenuOptions } from '../user-interface/menu-options';

// TODO: Refactor isCoralIntersected and isNotCoralIntersected into isMenuOptionIntersected
export const isCoralIntersected = (): void => {
  // Get the marker id number for the selected marker
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const markerId = getMarkerId();

  // Set the global selected marker ID
  selectedMarkerId = markerId;

  // If an intersected entity is the coral menu
  if (
    els.some(
      (el: Entity) =>
        el.id === `menuCoral${markerId}` || el.id === `coralText${markerId}`
    )
  ) {
    // Save annotation to database: isCoral = 1 (coral)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    saveData(markerId, 1);

    // Hide menu options
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    displayMenuOptions(markerId);
  }
};

export const isNotCoralIntersected = (): void => {
  // Get the marker id number for the selected marker

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const markerId = getMarkerId();

  // Set the global selected marker ID
  selectedMarkerId = markerId;

  // If an intersected entity is the not coral menu
  if (
    els.some(
      (el: Entity) =>
        el.id === `menuNotCoral${markerId}` ||
        el.id === `notCoralText${markerId}`
    )
  ) {
    // Save annotation to database: isNotCoral = 0 (not coral)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    saveData(markerId, 0);

    // Hide menu options
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    displayMenuOptions(markerId);
  }
};
