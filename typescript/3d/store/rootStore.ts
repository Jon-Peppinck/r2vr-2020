import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { logger } from 'redux-logger';

import { annotationReducer } from './annotation/AnnotationReducer';
import { userReducer } from './user/UserReducer';

import { AppActions } from './models/actions';

const rootReducer = combineReducers({
  annotationReducer,
  userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>, logger)
);
