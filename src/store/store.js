import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducers';

// CURRYING -> A fn that returns another fn;
// const loggerMiddleware = (store) => (next) => (action) => {
//     if(!action.type){
//         return next(action);
//     }

//     console.log('type:', action.type);
//     console.log('payload: ', action.payload);
//     console.log('currentState: ', store.getState());

//     next(action);

//     console.log('nex state: ', store.getState());
// }

const middleWares = [logger];

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composeEnhancers);