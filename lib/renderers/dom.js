import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import StateApi from 'state-api';

const store = new StateApi(window.initialData);

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);