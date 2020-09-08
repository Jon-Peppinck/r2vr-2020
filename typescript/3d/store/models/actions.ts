import { AnnotationActionTypes } from '../annotation/models/actions';
import { UserActionTypes } from '../user/models/actions';

export type AppActions = AnnotationActionTypes | UserActionTypes;
