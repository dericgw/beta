import React, { lazy } from 'react';
import { Redirect, Router } from '@reach/router';
import { inject, observer } from 'mobx-react';

import { Main, Sidebar, Wrapper } from '../../layout';

const Menu = lazy(() => import(/* webpackChunkName: "menu" */ '../../components/menu'));
const Share = lazy(() => import(/* webpackChunkName: "share-routes" */ './share'));
const Shares = lazy(() =>
  import(/* webpackChunkName: "sidebar.shares" */ '../../components/shares'),
);

const ProtectedRoutes = ({ store: { userStore } }) => {
  return userStore.isAuthed ? (
    <>
      <Menu />
      <Wrapper>
        <Sidebar>
          <Shares />
        </Sidebar>
        <Main>
          <Router className="router">
            <Share path="share/*" />
          </Router>
        </Main>
      </Wrapper>
    </>
  ) : (
    <Redirect to="/" noThrow />
  );
};

export default inject('store')(observer(ProtectedRoutes));
