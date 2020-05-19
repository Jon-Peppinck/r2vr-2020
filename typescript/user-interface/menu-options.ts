// eslint-disable-next-line import/prefer-default-export
export const displayMenuOptions = (id: number, bool = false) => {
  if (bool) {
    // Menu options are now visible
    document.getElementById(`menuCoral${id}`)?.setAttribute('visible', 'true');
    document
      .getElementById(`menuNotCoral${id}`)
      ?.setAttribute('visible', 'true');
  } else {
    // Marker no longer hovered
    // isMarkerHovered = false; // TODO - GLOBAL STATE

    // Menu options no longer need to be visible

    document.getElementById(`menuCoral${id}`)?.setAttribute('visible', 'false');
    document
      .getElementById(`menuNotCoral${id}`)
      ?.setAttribute('visible', 'false');
  }
};
