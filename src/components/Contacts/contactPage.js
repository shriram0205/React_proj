import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContactActions from '../../actions/contactActions';
import nameList from '../Names/nameList';
import ContactForm from './ContactForm';
import {browserHistory} from 'react-router';
// import toastr from 'toastr'; 

class ContactPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      contact: this.props.contact, 
      contactName: this.props.contactName,
      checkBox: props.checkBoxNames,
      saving: false,
      isEditing: false
    };
    this.saveContact = this.saveContact.bind(this);
    this.updateContacttState = this.updateContactState.bind(this);
    this.updateContactName = this.updateContactName.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.redirect = this.redirect.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.contact.id != nextProps.contact.id) {
      this.setState({Contact: nextProps.contact});
    }
    if (this.props.checkBoxName.length < nextProps.checkBoxName.length) {
      this.setState({contactName: nextProps.contactName, checkBoxName: nextProps.checkBoxName});
    }

    this.setState({saving: false, isEditing: false});
  }

  toggleEdit() {
    this.setState({isEditing: true});
  }

  updateContactNames(event) {
    const contact = this.state.contact;
    const nameId = event.target.value;
    const name = this.state.checkBoxName.filter(name => name.id == nameId)[0];
    const checked = !name.checked;
    name['checked'] = !name.checked;
    if (checked) {
      Contact.name_ids.push(name.id);
    } else {  
      Contact.name_ids.splice(Contact.name_ids.indexOf(name.id));
    }
    this.setState({Contact: Contact});

  }

  updateContactState(event) {
    const field = event.target.name;
    const Contact = this.state.Contact;
    Contact[field] = event.target.value;
    return this.setState({Contact: Contact});
  }

  saveContact(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.updateContact(this.state.Contact);

  } 

  deleteContact(event) {
    this.props.actions.deleteContact(this.state.Contact)
  }

  redirect() {
    browserHistory.push('/Contacts');
  }

  render() {
    if (this.state.isEditing) {
      return (
      <div>
        <h1>edit Contact</h1>
        <ContactForm 
          Contact={this.state.Contact} 
          Names={this.state.checkBoxNames}
          onSave={this.saveContact} 
          onChange={this.updateContactState} 
          onnameChange={this.updateContactNames}
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.state.Contact.name}</h1>
        <p>breed: {this.state.Contact.breed}</p>
        <p>weight: {this.state.Contact.weight}</p>
        <p>temperament: {this.state.Contact.temperament}</p>
        <nameList Names={this.state.ContactNames} />
        <button onClick={this.toggleEdit} className="btn btn-default  ">edit</button>
        <button onClick={this.deleteContact} className="btn btn-default  ">delete</button>
      </div>
    );
  }
}


ContactPage.propTypes = {
  Contact: PropTypes.object.isRequired,
  ContactNames: PropTypes.array.isRequired,
  checkBoxNames: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getContactById(Contacts, id) {
  let Contact = Contacts.find(Contact => Contact.id == id)
  return Object.assign({}, Contact)
}

function NamesForCheckBoxes(Names, Contact=null) {
  return Names.map(name => {
    if (Contact && Contact.name_ids.filter(nameId => nameId == name.id).length > 0) {
      name['checked'] = true;
    } else {
      name['checked'] = false;
    }
    return name;
  });
}

function collectContactNames(Names, Contact) {
  let selected = Names.map(name => {
    if (Contact.name_ids.filter(nameId => nameId == name.id).length > 0) {
      return name;
    }
  })
  return selected.filter(el => el != undefined)
}

function mapStateToProps(state, ownProps) {
  const stateNames = Object.assign([], state.Names)
  let checkBoxNames = [];
  let ContactNames = [];
  let Contact = {name: '', breed: '', weight: '', temperament: '', name_ids: []};
  const ContactId = ownProps.params.id;
  if (ContactId && state.Contacts.length > 0 && state.Names.length > 0) {
    Contact = getContactById(state.Contacts, ownProps.params.id);
    if (Contact.id && Contact.name_ids.length > 0) {
      checkBoxNames = NamesForCheckBoxes(stateNames, Contact);
      ContactNames = collectContactNames(stateNames, Contact);
    } else {
      checkBoxNames = NamesForCheckBoxes(stateNames)
    }
  } 
    return {Contact: Contact, checkBoxNames: checkBoxNames, ContactNames: ContactNames};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContactActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);