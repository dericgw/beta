import React, { lazy } from 'react';
import { Redirect, Router } from '@reach/router';
import { inject, observer } from 'mobx-react';

import Menu from '../../components/menu';
import { Main, Sidebar, Wrapper } from '../../layout';
import PreviousShares from '../../components/previous-shares';

const Share = lazy(() => import(/* webpackChunkName: "share" */ './share'));

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

const ProtectedRoutes = ({ user }) =>
  user.isAuthed ? (
    <>
      <Menu />
      <Wrapper>
        <Sidebar>
          <PreviousShares previousShares={previousShares} />
        </Sidebar>
        <Main>
          <Router>
            <Share path="share" />
          </Router>
        </Main>
      </Wrapper>
    </>
  ) : (
    <Redirect to="/" noThrow />
  );

export default inject('user')(observer(ProtectedRoutes));
