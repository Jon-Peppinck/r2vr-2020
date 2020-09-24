const numberAsWordLookup = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
};

export const EVALUATION_RESPONSE_COLOR = '#00FF00';
export const EVALUATION_RESPONSE_DEFAULT_COLOR = '#FFFFFF';

export const setOptionColor = (
  optionResponseNumber: Shared.QuestionResponseOption
) => {
  const optionNumberAsWord = numberAsWordLookup[optionResponseNumber];
  console.log(optionNumberAsWord);
  document
    .getElementById(`option${optionNumberAsWord}Plane`)!
    .setAttribute('color', EVALUATION_RESPONSE_COLOR);
};

export const resetOptionColor = () => {
  Object.values(numberAsWordLookup).forEach((optionNumberAsWord) => {
    document
      .getElementById(`option${optionNumberAsWord}Plane`)!
      .setAttribute('color', EVALUATION_RESPONSE_DEFAULT_COLOR);
  });
};

export const setPostColor = () => {
  document
    .getElementById('postPlane')!
    .setAttribute('color', EVALUATION_RESPONSE_COLOR);
};

export const resetPostColor = () => {
  document
    .getElementById('postPlane')!
    .setAttribute('color', EVALUATION_RESPONSE_DEFAULT_COLOR);
};
