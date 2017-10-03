import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

var $ = window.$ = require('jquery');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
