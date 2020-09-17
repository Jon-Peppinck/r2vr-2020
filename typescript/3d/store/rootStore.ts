import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { logger } from 'redux-logger';

import { annotationReducer } from './annotation/AnnotationReducer';
import { imageReducer } from './image/ImageReducer';
import { userReducer } from './user/UserReducer';

import { AppActions } from './models/actions';

const rootReducer = combineReducers({
  annotationReducer,
  imageReducer,
  userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>, logger)
);
