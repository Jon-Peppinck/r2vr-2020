import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { logger } from 'redux-logger';

import { metaDataReducer } from './metadata/MetaDataReducer';
import { userReducer } from './user/UserReducer';

import { AppActions } from './models/actions';

const rootReducer = combineReducers({
  metaDataReducer,
  userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>, logger)
);
