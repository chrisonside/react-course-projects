import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// You can remove registerServiceWorker as that's not covered in this course

// Wrap entire App in a BrowserRouter.
// This sets up the BrowserRouter and will also listen to changes in the URL and notify other components when the URL changes.
// 'For React Router to work properly, you need to wrap your whole app in a BrowserRouter component. Also, BrowserRouter wraps the history library which makes it possible for your app to be made aware of changes in the URL.'
// So currently we have a <BrowserRouter> listening to the address bar wrapped around our app

/*
	The <BrowserRouter> should be used when you have a server that will handle dynamic requests (knows how to respond to any possible URI), while the <HashRouter> should be used for static websites (can only respond to requests for files that it knows about).
	Each router creates a history object, which it uses to keep track of the current location[1] and re-render the website whenever that changes.
	https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
*/
ReactDOM.render(
	<BrowserRouter><App /></BrowserRouter>,
	document.getElementById('root')
);
registerServiceWorker();
