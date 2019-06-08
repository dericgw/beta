import React, { useEffect } from 'react';
import { Provider, observer } from 'mobx-react';

import initFirebase from './firebase';
import RootStore from './stores';
import Routes from './routes';
import GlobalStyles from './assets/styles/global';

const firebase = initFirebase();
const rootStore = new RootStore(firebase);

const App = () => {
  useEffect(() => {
    rootStore.updateEntryUrl(window.location.pathname);
    console.log(rootStore.redirectTo);
  }, []);

  return (
    <>
      <Provider store={rootStore}>
        <Routes />
      </Provider>
      <GlobalStyles />
    </>
  );
};

export default observer(App);
