import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import initFirebase from './firebase-config';
import App from './app';
import * as serviceWorker from './serviceWorker';

initFirebase();

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
