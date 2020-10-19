export const CORAL_COLOR = '#FF00FF';
export const NOT_CORAL_COLOR = '#FFFF00';
// export const CORAL_COLOR = '#FF95BC';
// export const NOT_CORAL_COLOR = '#969696';

const customColors = document.getElementById('colors')!.className;
console.log(89, customColors);

export const setMarkerColor = (
  markerId: number,
  coralBinary: Shared.CoralBinary
) => {
  console.log(90, customColors);
  const markerBoundary = document.getElementById(`markerBoundary${markerId}`);
  if (coralBinary === 1) {
    // console.log(8, customColors);
    markerBoundary?.setAttribute('color', CORAL_COLOR);
  } else {
    markerBoundary?.setAttribute('color', NOT_CORAL_COLOR);
  }
};
