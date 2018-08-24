import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Contact from './Contact';
import { getContacts } from '../../actions/contactActions';

class Contacts extends Component {
  // Setup contacts object
  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    const { contacts } = this.props;
    return (
      <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Contact</span> List
        </h1>
        {contacts.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </React.Fragment>
    );
  }
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  getContacts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contacts: state.contact.contacts
});

// FIREUP THE REDUCER WITH DISPATCH - moved to actions/contactActions.js
//const mapDispatchToProps = state => ({
//  getContacts: () =>
//    dispatch({
//      type: GET_CONTACTS
//    })
//});

// Notice how the DISPATCH is replaced with a direct call in this export
export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts);
