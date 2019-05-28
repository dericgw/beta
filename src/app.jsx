import React from 'react';
import { Provider } from 'mobx-react';

import RootStore from './stores';
import Routes from './routes';
import GlobalStyles from './assets/styles/global';
import User from './stores/user';
import Shares from './stores/shares';

const store = new RootStore();
const user = new User();
const shares = new Shares();

const App = () => (
  <>
    <Provider store={store} user={user} shares={shares}>
      <Routes />
    </Provider>
    <GlobalStyles />
  </>
);

export default App;
