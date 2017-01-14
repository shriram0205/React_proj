import React, {PropTypes} from 'react';
import ContactListItem from './ContactListItem';
import {Link} from 'react-router';


const ContactList = ({contacts}) => {
  return (
      <ul className="list-group">
        {contacts.map(contact => 
           <li className="list-group-item" key={contact.id}><Link to={'/contacts/' + contact.id}>{contact.name}</Link></li>
        )}
      </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default ContactList;