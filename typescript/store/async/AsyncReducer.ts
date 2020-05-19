import { AsyncActionTypes } from './models/actions';
import { ObservationNumber } from './models/ObservationNumber';

const defaultState: ObservationNumber = { observation_number: 0 };

// eslint-disable-next-line import/prefer-default-export
export const asyncReducer = (
  state = defaultState,
  action: AsyncActionTypes
): ObservationNumber => {
  switch (action.type) {
    case 'FETCH_LAST_OBSERVATION_NUMBER_PENDING':
      return { ...state };

    case 'FETCH_LAST_OBSERVATION_NUMBER_FULFILLED':
      return { ...action.observation_number };

    case 'FETCH_LAST_OBSERVATION_NUMBER_REJECTED':
      return { ...action.observation_number };

    default:
      return state;
  }
};
