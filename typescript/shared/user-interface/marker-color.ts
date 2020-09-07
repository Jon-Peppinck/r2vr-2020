const CORAL_COLOR = '#FF95BC';
const NOT_CORAL_COLOR = '#969696';

const setMarkerColor = (markerId: number, coralBinary: Shared.CoralBinary) => {
  const markerBoundary = document.getElementById(`markerBoundary${markerId}`);
  if (coralBinary === 1) {
    markerBoundary?.setAttribute('color', CORAL_COLOR);
  } else {
    markerBoundary?.setAttribute('color', NOT_CORAL_COLOR);
  }
};

export default setMarkerColor;
