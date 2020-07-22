import { store } from '../rootStore';

import { AppActions } from '../models/actions';

import { EVALUATION } from './models/actions';
import { EvaluationResponse } from './models/EvaluationResponse';

const evaluationResponseIntersection = (
  res: EvaluationResponse
): AppActions => {
  return {
    type: EVALUATION,
    res,
  };
};

const boundEvaluationResponseIntersection = (res: EvaluationResponse) =>
  store.dispatch(evaluationResponseIntersection(res));

export default boundEvaluationResponseIntersection;
