import React from 'react';
import ReactDOM from 'react-dom';

import App from 'component/App';

ReactDOM.hydrate(
  <App />,
  document.getElementById('root')
);