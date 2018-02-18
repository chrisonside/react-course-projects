import React, { Component } from 'react';
import ListContacts from './ListContacts'
import ListContactsSFC from './ListContactsSFC'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

// Use this for hardcoded data for now, as we don't know how or where to make our network requests 
// (eventually our contacts will be stored and retrieved on a backend server)
// const contacts = [
//   {
//     "id": "ryan",
//     "name": "Ryan Florence",
//     "email": "ryan@reacttraining.com",
//     "avatarURL": "http://localhost:5001/ryan.jpg"
//   },
//   {
//     "id": "michael",
//     "name": "Michael Jackson",
//     "email": "michael@reacttraining.com",
//     "avatarURL": "http://localhost:5001/michael.jpg"
//   },
//   {
//     "id": "tyler",
//     "name": "Tyler McGinnis",
//     "email": "tyler@reacttraining.com",
//     "avatarURL": "http://localhost:5001/tyler.jpg"
//   }
// ]

class App extends Component {

  // Good rule of thumb - if you're using any piece of state to render UI (as we are here)..
  // then that state should live inside of a component (as opposed to floating around as a random variable somewhere)
  // Putting it inside of this React component means we can get React to manage the state and the corresponding UI
  // By having a component manage its own state, any time there are changes made to that state, React will know and automatically make the necessary updates to the page.
  // Note - when defining a component's initial state, avoid initializing that state with props.
  
  // So - A component's state can be defined at initialization
  // And - A component can alter its own internal state

  /* 
    'This is one of the key benefits of using React to build UI components: when it comes to re-rendering the page, we just have to think about updating state. We don't have to keep track of exactly which parts of the page change each time there are updates. We don't need to decide how we will efficiently re-render the page. React compares the previous output and new output, determines what has changed, and makes these decisions for us. This process of determining what has changed in the previous and new outputs is called Reconciliation.'
  */

  /* 
    Lifecycle events are special methods that React provides that allow us to hook into different points in a component's life to run some code. Now there are a number of different lifecycle events and they will run at different points, but we can break them down into three distinct categories:

    Adding to the DOM
    These lifecycle events are called when a component is being added to the DOM:
    constructor()
    componentWillMount()
    render()
    componentDidMount()
    
    Re-rendering
    These lifecycle events are called when a component is re-rendered to the DOM
    componentWillReceiveProps()
    shouldComponentUpdate()
    componentWillUpdate()
    render()
    componentDidUpdate()
    
    Removing from the DOM
    This lifecycle event is called when a component is being removed from the DOM
  componentWillUnmount()

  */


  state = {
    contacts: [
      // GET THIS FROM THE API INSTEAD!
      // So we'll be making a request to an API and putting that data into our state

      // {
      //   "id": "ryan",
      //   "name": "Ryan Florence",
      //   "email": "ryan@reacttraining.com",
      //   "avatarURL": "http://localhost:5001/ryan.jpg"
      // },
      // {
      //   "id": "michael",
      //   "name": "Michael Jackson",
      //   "email": "michael@reacttraining.com",
      //   "avatarURL": "http://localhost:5001/michael.jpg"
      // },
      // {
      //   "id": "tyler",
      //   "name": "Tyler McGinnis",
      //   "email": "tyler@reacttraining.com",
      //   "avatarURL": "http://localhost:5001/tyler.jpg"
      // }
    ],

    // Added this state property to mimick how React Router switches UI via state
    screen: 'list'
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
      // equivalent of this.setState({ contacts: contacts })
    })
  }

  removeContact = (contact) => {
    this.setState( (state) => ({
      contacts: state.contacts.filter( (c) => c.id !== contact.id )
    }))

    // If we want to remove it from the database (as well as our local state)
    ContactsAPI.remove(contact);
  }

  // This is the composition approach - bringing standalone components together in the app's render method
  render() {
    return (
      <div>
        {/* expression && expression is a JavaScript technique called short-circuit evaluation. If the first expression evaluates to true, then the second expression is run */}
        {/* We added this to pass a function to the ListContacts component so it'd have a chance to chance the state of the app that until now would have been out of its jurisdiction.  Note that this is the same approach as when we passed this.removeContact above, but onNavigate just uses an annonymous arrow function instead of a named handler function.
          However our solution doesn't fully work as pressing the back button didn't get our correct route back! So we were then going to switch over to using React Router to manage our app's screens.. */}
        {this.state.screen === 'list' &&(
          <ListContacts 
          onDeleteContact={this.removeContact} 
          contacts={this.state.contacts}
          onNavigate={() => {
            this.setState({ screen: 'create' })
          }}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact/>
        )}

        {/*<ListContactsSFC 
          onDeleteContact={this.removeContact}
          contacts={this.state.contacts}
        />*/}

      </div>
    );
  }
}

export default App;
