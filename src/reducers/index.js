import {combineReducers} from 'redux';
import contacts from './contactReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
  // short hand property names
  contacts,
  session
})

export default rootReducer;