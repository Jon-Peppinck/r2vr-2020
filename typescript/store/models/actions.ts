import { IntersectionActionTypes } from '../intersection/models/actions';
import { AsyncActionTypes } from '../async/models/actions';

export type AppActions = AsyncActionTypes | IntersectionActionTypes;
