import React from 'react';
import { Provider } from 'mobx-react';

import RootStore from './store';
import Routes from './routes';
import GlobalStyles from './assets/styles/global';
import { Main, Sidebar, Wrapper } from './layout';
import PreviousShares from './components/previous-shares';
import Menu from './components/menu';

const store = new RootStore();

const previousShares = [
  {
    id: 1,
    title: 'Lost Forever',
    recipient: 'deric.cain@gmail.com',
    hasBeenViewed: true,
  },
  {
    id: 2,
    title: 'Win Again',
    recipient: 'deric.cain@gmail.com',
    hasBeenViewed: false,
  },
  {
    id: 3,
    title: 'It will happen again',
    recipient: 'deric.cain@gmail.com',
    hasBeenViewed: false,
  },
];

const App = () => (
  <>
    <Menu />
    <Wrapper>
      <Sidebar>
        <PreviousShares previousShares={previousShares} />
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
