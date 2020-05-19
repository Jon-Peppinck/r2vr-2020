import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { logger } from 'redux-logger';

// // import { operationReducer } from './operation/OperationReducer';
import { asyncReducer } from './async/AsyncReducer';
import { intersectionReducer } from './intersection/IntersectionReducer';
import { AppActions } from './models/actions';

const rootReducer = combineReducers({
  asyncReducer,
  intersectionReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>, logger)
);
