import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';

import TextInputGroup from '../layout/TextInputGroup';

import uuid from 'uuid';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

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

    const newContact = {
      //id: uuid(),
      name,
      email,
      phone
    };

    //console.log(newContact);

    // ASYNC CALL
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );

    dispatch({
      type: 'ADD_CONTACT',
      payload: res.data
    });

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
              <div className="card-header">Add Contact</div>
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
                  value="Add Contact"
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

export default AddContact;
