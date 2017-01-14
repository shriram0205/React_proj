// src/reducers/rootReducer.js

import {combineReducers} from 'redux';  
import contacts from './contactReducer';

const rootReducer = combineReducers({  
  // short hand property names
  contacts
})

export default rootReducer;