import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
require('dotenv').config({ path: __dirname + '/.env'});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
