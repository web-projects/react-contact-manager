import React, { Component } from 'react';
import Contact from './components/Contact';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header branding="Contact Manager" />
        <div className="container">
          <Contact
            name="John Doe"
            email="Email: jdoe@gmail.com"
            phone="Phone: 555-555-5555"
          />
          <Contact
            name="Karen Smith"
            email="Email: ksmith@gmail.com"
            phone="Phone: 111-111-1111"
          />
        </div>
      </div>
    );
  }
}

export default App;
