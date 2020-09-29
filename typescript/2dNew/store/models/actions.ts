import { MetaDataActionTypes } from '../metadata/models/actions';
import { UserActionTypes } from '../user/models/actions';

export type AppActions = MetaDataActionTypes | UserActionTypes;
