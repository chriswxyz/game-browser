import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { default as thunk } from 'redux-thunk';
import { allReducers } from './state';

export function create() {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const combined = combineReducers(allReducers);
    const enhancers = composeEnhancers(applyMiddleware(thunk))
    const store = createStore(combined, enhancers);

    return store;
}
