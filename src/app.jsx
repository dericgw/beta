import React from 'react';
import { Provider } from 'mobx-react';

import RootStore from './store';
import Routes from './routes';
import GlobalStyles from './assets/styles/global';
import { Main, Sidebar, Wrapper } from './layout';
import PreviousShares from './components/previous-shares';
import Menu from './components/menu';

const store = new RootStore();

const App = () => (
  <>
    <Menu />
    <Wrapper>
      <Sidebar>
        <PreviousShares />
      </Sidebar>
      <Provider store={store}>
        <Main>
          <Routes />
        </Main>
      </Provider>
      <GlobalStyles />
    </Wrapper>
  </>
);

export default App;
