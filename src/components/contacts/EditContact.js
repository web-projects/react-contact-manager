import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';

import TextInputGroup from '../layout/TextInputGroup';

import uuid from 'uuid';

class EditContact extends Component {
  // Reset state
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    // Parameter is ID
    const { id } = this.props.match.params;

    console.log(this.props);
    console.log(this.name);

    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      const contact = res.data;
      this.setState({
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      });
    } catch (e) {
      // 404 error with newly ADDED contact since it doesn't really exist in the repository
      //const { name, email, phone } = this.props.match.params;
      const { contact } = this.state;
      console.log(contact);
      /*this.setState({
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      });*/
    }
  }

  onSubmit = async (dispatch, e) => {
    // No default action
    e.preventDefault();

    // Pull out content from state to build payload
    const { name, email, phone } = this.state;

    // Check for errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const updateContact = {
      //id: uuid(),
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    console.log(updateContact);

    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updateContact
      );

      dispatch({
        type: 'UPDATE_CONTACT',
        payload: res.data
      });
    } catch (e) {
      // 404 error with newly ADDED contact since it doesn't really exist in the repository
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: updateContact
      });
    }

    // Clear state/form
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    // Redirect to INDEX
    this.props.history.push('/');
  };

  // Only a single change state is needed as long as the 'e.targe.name is set for all cases.
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextInputGroup
                  label="Phone"
                  name="phone"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />
                <input
                  type="submit"
                  value="Update Contact"
                  className="btn btn-light btn-block"
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
