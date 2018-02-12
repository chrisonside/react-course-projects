import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// You can remove registerServiceWorker as that's not covered in this course

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
