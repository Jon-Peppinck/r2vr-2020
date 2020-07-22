export const EVALUATION_OPTION_COLOR = '#00FF00';

export const setOptionColor = (optionResponseNumber: number) => {
  document
    .getElementById(`option${optionResponseNumber}Plane`)!
    .setAttribute('color', 'green');
  // if (coralBinary === 1) {
  //   markerCircumference?.setAttribute('color', CORAL_COLOR);
  // } else {
  //   markerCircumference?.setAttribute('color', NOT_CORAL_COLOR);
  // }
};
