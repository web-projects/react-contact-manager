import React, { Component } from 'react';

class AddContact extends Component {
  constructor(props) {
    super(props);

    // Create references to variables
    this.nameInput = React.createRef();
    this.phoneInput = React.createRef();
    this.emailInput = React.createRef();
  }

  static defaultProps = {
    name: 'Fred Smith',
    email: 'fred@yahoo.com',
    phone: '777-777-7777'
  };

  onSubmit = e => {
    e.preventDefault();

    const contact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value
    };

    console.log(contact);
  };
  render() {
    const { name, email, phone } = this.props;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control form=control-lg"
              placeholder="
          Enter Name..."
              defaultValue={name}
              ref={this.nameInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control form=control-lg"
              placeholder="
          Enter Email..."
              defaultValue={email}
              ref={this.emailInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control form=control-lg"
              placeholder="
          Enter Phone..."
              defaultValue={phone}
              ref={this.phoneInput}
            />
          </div>
          <input
            type="submit"
            value="Add Contact"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    );
  }
}

export default AddContact;
