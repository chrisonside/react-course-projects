import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

/* 
	CONTROLLED COMPONENT
	A component which renders a form, but the source of truth for that form state lives inside of the component state rather than inside of the DOM

	With Controlled Components, our form state lives inside of the component. Because of this, we can easily update our UI based on that form state.

	Notes on the code:

	Added a unique key to each iterated array item when outputting to the UI. This is so React can keep tabs on whether individual items change. (As opposed to React recreating that list every time)

	Event here is just an event object that React is giving us
	Our displayed value (in input) will always be the value in the components state, making our state the single source of truth. Because it is React that ultimately controls the value of our input form element, we consider this component a Controlled Component.

	To recap how user input affects the ListContacts components own state
	The user enters text into the input field.
	An event listener invokes the updateQuery() function on every onChange event.
	updateQuery() then calls setState(), merging in the new state to update the component's internal state.
	Because its state has changed, the ListContacts component re-renders.

	Note - difference between this and a STATELESS COMPONENT
	STATELESS COMPONENTS are another example of using the JavaScript class syntax with the render method to build out our components
	But STATELESS COMPONENTS are when the class only has the render property
	https://tylermcginnis.com/functional-components-vs-stateless-functional-components-vs-stateless-components/ 

	Udacity summary at end of exercise:
	Each update to state has an associated handler function
	Form elements receive their current value via an attribute
	Form input values are generally stored in the component's state
	Event handlers for a controlled element update the component's state

	Controlled Components Recap
	Controlled components refer to components that render a form, but the "source of truth" for that form state lives inside of the component state rather than inside of the DOM. The benefits of Controlled Components are:

	instant input validation
	conditionally disable/enable buttons
	enforce input formats
	In our ListContacts component, not only does the component render a form, but it also controls what happens in that form based on user input. In this case, event handlers update the component's state with the user's search query. And as we've learned: any changes to React state will cause a re-render on the page, effectively displaying our live search results.

	Putting it All Into Perspective
	When it comes to keeping track of data in your app, think about what will be done with that data, and what that data will look like as your user interfaces with your app. If you want your component to store mutable local data, consider using state to hold this information. Many times, it is state that will be used to manage controlled form elements in your components.

	On the other hand, if some information isn't expected to change over time, and is generally designed to be "read-only" throughout your app, consider using props instead. Both state and props will generally be in the form of an object, and changes in either will trigger a re-render of the component, but they each play very different roles in your app.

*/
class ListContacts extends Component {
	/* Set up our PropTypes config */
	static PropTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	// Passing setState an object, as we aren't going to be updating the state based on the previous state
	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	clearQuery = () => {
		this.setState({ query: '' })
	}

	// Remember render is the only property in our component class which we have to specify
	render() {
		/* DESTRUCTURING OUR OBJECTS: 
		At this point, our component is a bit unwieldy; the render() method accesses query from the state object (this.state.query) and contacts from the props object (this.props.contacts) quite often. Because props and state are just JavaScript objects, we can use an ES6 feature to unpack them into distinct variables rather than referencing them as this.state.query and this.props.contacts every time. This process of unpacking is called object destructuring. 
		All in all, destructuring our objects shouldn't change the return value of our code, but it can make things look a bit cleaner. 
		So rather than referencing this.state.query loads, or this.props.contacts, or this.props.onDeleteContact, we are going to set up 3 variables off of those objects, and then update all of the references to this.props.contacts for example to be simply contacts. 
		*/
		const { contacts, onDeleteContact } = this.props
		const { query } = this.state


		let showingContacts
		if (query) {
			// So if the user has typed something into our input box, meaing our this.state.query is truthy
			const match = new RegExp(escapeRegExp(query), 'i')
			showingContacts = contacts.filter((contact) => match.test(contact.name))	
		} else {
			showingContacts = contacts
		}

		showingContacts.sort(sortBy('name'))

		// We can think of passing in props to components just as we pass arguments into functions. 
		// We can access a component's props with this.props (or props in stateless functional components).
		// Any prop that's passed into the component is accessible on the this.props object.
		return (
			// Remember that return can only return one element
			<div className='list-contacts'>
				{/* Help us debug how the state for our ListContacts component is looking
				// Remember we are binding the form input to our state. So we are updating our state when the user interacts with the input field, and then updating the UI (and input) on the back of the state updating. */}
				{/* We want to change the state of the app (rather than just the state of this component), but we can't do that as the listContacts component doesn't own the state of the screen - that state lives in the app. So to change this state, we passed a function from the App to the ListContacts component (as we did earlier when passing the onDeleteContact function), and those passed functions can setState in the app.js. My analogy is passing a ladder to the components, so they have a way of altering state in the app, rather than just in their own small pond */}

				{JSON.stringify(this.state)}

				<div className='list-contacts-top'>
					<input 
						className='search-contacts'
						type='text'
						placeholder='Search contacts'
						value={query}
						onChange={ (event) => this.updateQuery(event.target.value) }
					/>
					<a
					href='#create'
					onClick={this.props.onNavigate}
					className='add-contact'
					>Add Contact</a>
				</div>

				{showingContacts.length !== contacts.length && (
		        	<div className='showing-contacts'>
		        		<span>Now showing {showingContacts.length} of {contacts.length} total</span>
		        		<button onClick={this.clearQuery}>Show all</button>
		        	</div>
		        )}

				<ol className='contact-list'>
					{showingContacts.map((contact) => (
						
						<li key={contact.id} className='contact-list-item'>
							<div className='contact-avatar' style={{
								backgroundImage: `url(${contact.avatarURL})`
							}}/>
							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>
							<button onClick={() => onDeleteContact(contact)} className='contact-remove'>
					    		Remove
					  		</button>
						</li>
					))}
				</ol>
			</div>
		);
	}

}

export default ListContacts
