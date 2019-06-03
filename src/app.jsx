import React from 'react';
import { Provider } from 'mobx-react';

import initFirebase from './firebase';
import RootStore from './stores';
import Routes from './routes';
import GlobalStyles from './assets/styles/global';

const firebase = initFirebase();
const store = new RootStore(firebase);

const App = () => (
  <>
    <Provider store={store}>
      <Routes />
    </Provider>
    <GlobalStyles />
  </>
);

export default App;
