/*
*	STATELESS FUNCTIONAL COMPONENTS approach
*/

// import React, { Component } from 'react'
import React from 'react' 
// We don't need React Component if we are using the stateless functional component approach (instead of the class approach that extends React Component)
import PropTypes from 'prop-types'

/* 
*	STATELESS FUNCTIONAL COMPONENTS (for situations where all your component method has is the render method)
*	'If your component does not keep track of internal state (i.e., all it really has is just a render() method), you can declare the component as a Stateless Functional Component.'
* 	'When a component is purely a result of props alone, no state, the component can be written as a pure function avoiding the need to create a React component instance.' https://www.reactenlightenment.com/react-state/8.4.html
*	Whilst we can use JavaScript class syntax and render method (plus other methods if we like) to build out our components, ****if all your component method has is the render method*****, you can actually just use a regular function to create your component
*	With the regular function approach, you don't need to use the this keyword to access the component's props, as our function is passed props as it's first argument. You also don't need the render method with this approach.

*/

function ListContactsSFC(props) {
	return (
		<ol className='contact-list'>
			{props.contacts.map((contact) => (
				<li key={contact.id} className='contact-list-item'>
					<div className='contact-avatar' style={{
						backgroundImage: `url(${contact.avatarURL})`
					}}/>
					<div className='contact-details'>
						<p>{contact.name}</p>
						<p>{contact.email}</p>
					</div>
					<button onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
						Remove
					</button>
				</li>
			))}
		</ol>
	)
}

/*
Stateless functional components are super intuitive and simple - regular function that takes in props as an argument and returns some UI. Also less hassle not having the this keyword (so not having to worry about what context the function is going to be invoked in)

You might well see stateless functional components written with ES6 arrow function syntax and an implicit return:

const Email = (props) (
	<div>
		{props.text}
	</div>
);

*/

/* Set up our PropTypes config */
ListContactsSFC.propTypes = {
	contacts: PropTypes.array.isRequired,
	onDeleteContact: PropTypes.func.isRequired
}


// Now export so we can import it into our app.js file
export default ListContactsSFC
