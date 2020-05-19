import { ObservationNumber } from './ObservationNumber';

export const FETCH_LAST_OBSERVATION_NUMBER_PENDING =
  'FETCH_LAST_OBSERVATION_NUMBER_PENDING';
export const FETCH_LAST_OBSERVATION_NUMBER_FULFILLED =
  'FETCH_LAST_OBSERVATION_NUMBER_FULFILLED';
export const FETCH_LAST_OBSERVATION_NUMBER_REJECTED =
  'FETCH_LAST_OBSERVATION_NUMBER_REJECTED';

interface PendingAction {
  type: typeof FETCH_LAST_OBSERVATION_NUMBER_PENDING;
  observation_number: ObservationNumber;
}

interface FulfilledAction {
  type: typeof FETCH_LAST_OBSERVATION_NUMBER_FULFILLED;
  observation_number: ObservationNumber;
}

interface RejectedAction {
  type: typeof FETCH_LAST_OBSERVATION_NUMBER_REJECTED;
  observation_number: ObservationNumber;
}

export type AsyncActionTypes = PendingAction | FulfilledAction | RejectedAction;
