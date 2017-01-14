import React from 'react';  
import { Route, IndexRoute } from 'react-router';  
import App from './components/App';  
import HomePage from './components/home/HomePage';  
import CatsPage from './components/contacts/ContactsPage';  
import CatPage from './components/contacts/ContactPage';

export default (  
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/contacts" component={ContactsPage} />
  </Route>
);