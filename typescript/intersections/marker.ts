// Determines if the marker is hovered
const handleMarkerIntersection = (): void => {
  // Prevents annotation points being marked if missing data
  if (!lastObservationNumber) {
    return;
  }

  // Get the marker ID number for the intersected marker
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const markerId = getMarkerId();

  // // Check if intersected element is the marker itself or a menu option
  if (
    els.some(
      (el: Entity) =>
        el.id === `marker${markerId}` ||
        el.id === `markerCircumference${markerId}` ||
        el.id === `menuCoral${markerId}` ||
        el.id === `menuNotCoral${markerId}` ||
        el.id === `coralText${markerId}` ||
        el.id === `notCoralText${markerId}`
    )
  ) {
    // Note: Menu options made visible in 'coral-cover-2d-buttons' custom AFRAME component => requires a button to be pressed to show options
    isMarkerHovered = true;

    // Check if a menu option is intersected
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isCoralIntersected();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isNotCoralIntersected();
  } else {
    // Marker no longer hovered
    isMarkerHovered = false;

    // Menu options no longer need to be visible
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    displayMenuOptions(markerId);
  }
};

export default handleMarkerIntersection;
