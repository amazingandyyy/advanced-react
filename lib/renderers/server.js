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
  const api = new StateApi(resp.data);
  const initialData = {
    articles: api.getArticles(),
    authors: api.getAuthors()
  };
  return ReactDOMServer.renderToString(
    <App initialData={initialData}/>
  );
};

export default serverRender;