import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';

import App from './app';
import * as serviceWorker from './serviceWorker';

configure({ enforceActions: 'always' });

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}

serviceWorker.unregister();
