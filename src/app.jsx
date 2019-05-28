import React from 'react';
import { Provider } from 'mobx-react';

import RootStore from './stores';
import Routes from './routes';
import GlobalStyles from './assets/styles/global';

const store = RootStore.create({ userStore: {} });

const App = () => (
  <>
    <Provider store={store}>
      <Routes />
    </Provider>
    <GlobalStyles />
  </>
);

export default App;
