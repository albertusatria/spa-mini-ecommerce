import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cart } from './redux/reducerCart';

export const initializeStore = () => {
    const middlewares = applyMiddleware(reduxLogger);
    const reducers = combineReducers({cart});
    return createStore(reducers, composeWithDevTools(middlewares));
}
