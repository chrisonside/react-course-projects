
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

/* 

	Until we use the form-serialize package, our form will serialize the values from user input (i.e., the name and email) by adding them as a query string to the URL and refreshing the page. This is what browsers do natively apparently! 

	We can add some additional functionality by having our app serialize these form fields on its own. After all, we want the app to ultimately handle creating the contact and saving it to the state. To accomplish this, we'll use the form-serialize package to output this information as a regular JavaScript object for the app to use.

	So we are going to:
	- serialize the form
	- and then the form's job is to call up to the App to say 'we want to save this contact'
	- and then the App is going to handle saving the contact
	- and then the App will add it into our state

	So to take control ourselves (instead of the browser natively taking control of the form when user hits submit), we will:
	- create a handler called handleSubmit

*/

class CreateContact extends Component {

	handleSubmit = (e) => {
		e.preventDefault()
		// Now serialise the form ourselves (e.target is the form itself, hash: true says to create a javaScript object)
		const values = serializeForm(e.target, {hash: true} )
		/* SerializeForm will:
			- jump through all of the inputs in the form
			- look at their name
			- pull out the values
			- and create a javaScript object
		*/
		// Now send these values on up to our App, and the job is done here
		// Put it behind a guard, to make sure the person that rendered this component actually passed us a ladder down (by way of a props function they pass us)
		if(this.props.onCreateContact)
			this.props.onCreateContact(values)


	}

  	render() {
    	return (
     		<div>
	     		<Link className='close-create-contact' to='/'>Close</Link>
	     		<form onSubmit={this.handleSubmit} className='create-contact-form'>
					<ImageInput
						className='create-contact-avatar-input'
						name='avatarURL'
						maxHeight={64}
					/>
					<div className='create-contact-details'>
						<input type='text' name='name' placeholder='Name'/>
						<input type='text' name='email' placeholder='Email'/>
						<button>Add Contact</button>
					</div>
	     		</form>
	     	</div>
    	)
	}
}

export default CreateContact