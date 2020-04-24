import { CoralBinary } from '../declarations/data';

// Choose colors of menu options
export const CORAL_COLOR = '#FF95BC';
export const NOT_CORAL_COLOR = '#969696';

export const setMarkerColor = (marker: number, coralBinary: CoralBinary) => {
  // Select corresponding Marker Circumference from DOM
  let markerCircumference = document.getElementById(
    `markerCircumference${marker}`
  );
  // Set appropriate color
  coralBinary === 1
    ? markerCircumference?.setAttribute('color', CORAL_COLOR)
    : markerCircumference?.setAttribute('color', NOT_CORAL_COLOR);
};
