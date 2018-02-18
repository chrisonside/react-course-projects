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
ReactDOM.render(
	<BrowserRouter><App /></BrowserRouter>, 
	document.getElementById('root')
);
registerServiceWorker();
