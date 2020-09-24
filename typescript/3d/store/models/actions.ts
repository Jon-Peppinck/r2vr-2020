import { AnnotationActionTypes } from '../annotation/models/actions';
import { EvaluationActionTypes } from '../evaluation/models/actions';
import { ImageActionTypes } from '../image/models/actions';
import { MetaDataActionTypes } from '../metadata/models/actions';
import { UserActionTypes } from '../user/models/actions';

export type AppActions =
  | AnnotationActionTypes
  | EvaluationActionTypes
  | ImageActionTypes
  | MetaDataActionTypes
  | UserActionTypes;
