import {
  resetOptionColor,
  resetPostColor,
} from '../../shared/user-interface/evaluation-color';
import { boundNewEvaluation } from '../store/evaluation/EvaluationAction';

export const evaluationObserver = () => {
  const mutationObserver = new MutationObserver(() => {
    resetOptionColor();
    resetPostColor();
    boundNewEvaluation();
  });

  mutationObserver.observe(document.getElementById('questionPlaneText')!, {
    attributes: true,
    attributeFilter: ['value'],
  });
};
