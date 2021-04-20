import { createStore, compose, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
//import { reducer } from './reducer';
import reducer from './reducers/diagram';


const logger = createLogger({
  level: 'info',
  collapsed: true
});

export const store = applyMiddleware(logger)(compose(createStore))(reducer);