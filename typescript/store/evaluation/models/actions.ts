import { EvaluationResponse } from './EvaluationResponse';

export const EVALUATION = 'EVALUATION';

interface EvaluationAction {
  type: typeof EVALUATION;
  res: EvaluationResponse;
}

export type EvaluationActionTypes = EvaluationAction;
