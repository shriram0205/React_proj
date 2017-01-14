import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function contactReducer(state = initialState.contacts, action) {
  switch(action.type) {
    case types.LOAD_CONTACTS_SUCCESS:
     return action.contacts
    case types.CREATE_CONTACT_SUCCESS:
      browserHistory.push(`/contacts/${action.contact.id}`)
      return [
        ...state.filter(contact => contact.id !== action.contact.id),
        Object.assign({}, action.contact)
      ]
    case types.UPDATE_CONTACT_SUCCESS:
      return [
        ...state.filter(contact => contact.id !== action.contact.id),
        Object.assign({}, action.contact)
      ]
    case types.DELETE_CONTACT_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfcontactToDelete = state.findIndex(contact => {return contact.id == action.contact.id})
      newState.splice(indexOfcontactToDelete, 1);
      browserHistory.push('/contacts');
      return newState;
    }
    default: 
      return state;
  }
}