import { AnnotationActionTypes } from '../annotation/models/actions';
import { ImageActionTypes } from '../image/models/actions';
import { UserActionTypes } from '../user/models/actions';

export type AppActions =
  | AnnotationActionTypes
  | ImageActionTypes
  | UserActionTypes;
