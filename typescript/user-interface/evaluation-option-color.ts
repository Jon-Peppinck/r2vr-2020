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

export const resetOptionsColor = () => {
  // TODO: refactor so 4 is dynamic
  for (let option = 1; option <= 4; option++) {
    document
      .getElementById(`option${option}Plane`)!
      .setAttribute('color', '#FFFFFF');
  }
};

// var i;
// for (i = 0; i < cars.length; i++) {
//   text += cars[i] + "<br>";
// }
