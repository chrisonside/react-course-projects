import React, { Component } from 'react'

class ListContacts extends Component {
	// Remember render is the only property in our component class which we have to specify
	render() {
		// We can think of passing in props to components just as we pass arguments into functions. 
		// We can access a component's props with this.props (or props in stateless functional components).
		// Any prop that's passed into the component is accessible on the this.props object.
		return (
			<ol className='contact-list'>
				{this.props.contacts.map((contact) => (
					<li key={contact.id} className='contact-list-item'>
						<div className='contact-avatar' style={{
							backgroundImage: `url(${contact.avatarURL})`
						}}/>
						<div className='contact-details'>
							<p>{contact.name}</p>
							<p>{contact.email}</p>
						</div>
						<button className='contact-remove'>
							Remove
						</button>
					</li>
				))}
			</ol>
		);
	}
}
// Added a unique key to each iterated array item when outputting to the UI. 
// This is so React can keep tabs on whether individual items change
// (As opposed to React recreating that list every time)


// Now export so we can import it into our app.js file
export default ListContacts
