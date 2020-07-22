import { EvaluationActionTypes } from './models/actions';
import { EvaluationResponse } from './models/EvaluationResponse';

const defaultState: EvaluationResponse = { id: 0, isHovered: false };

// eslint-disable-next-line import/prefer-default-export
export const evaluationReducer = (
  state = defaultState,
  action: EvaluationActionTypes
): EvaluationResponse => {
  switch (action.type) {
    case 'EVALUATION':
      return { ...action.res };

    default:
      return state;
  }
};
