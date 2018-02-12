import React, { Component } from 'react';
import ListContacts from './ListContacts'

// Use this for hardcoded data for now, as we don't know how or where to make our network requests 
// (eventually our contacts will be stored and retrieved on a backend server)
const contacts = [
  {
    "id": "ryan",
    "name": "Ryan Florence",
    "email": "ryan@reacttraining.com",
    "avatarURL": "http://localhost:5001/ryan.jpg"
  },
  {
    "id": "michael",
    "name": "Michael Jackson",
    "email": "michael@reacttraining.com",
    "avatarURL": "http://localhost:5001/michael.jpg"
  },
  {
    "id": "tyler",
    "name": "Tyler McGinnis",
    "email": "tyler@reacttraining.com",
    "avatarURL": "http://localhost:5001/tyler.jpg"
  }
]

class App extends Component {
  render() {
    return (
      <div>
        <ListContacts contacts={contacts} />
        // Note - You pass in props individually just as you would with any other HTML attributes.
        e.g. <ListContacts contacts={contacts} company='my company'/>
      </div>
    );
  }
}

export default App;
