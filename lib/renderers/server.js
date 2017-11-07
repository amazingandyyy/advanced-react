import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import StateApi from 'state-api';

import App from 'components/App';
import config from 'config';

const serverRender = async () => {
  try {
    var resp = await axios.get(`http://${config.host}:${config.port}/data`);
  }
  catch(e) {
    console.error('error:', e.message);
  }
  const store = new StateApi(resp.data);
  return {
    initialMarkup: ReactDOMServer.renderToString(
      <App store={store}/>
    ),
    initialData: resp.data
  };
};

export default serverRender;