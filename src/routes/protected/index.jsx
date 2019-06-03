import React, { lazy } from 'react';
import { Redirect, Router } from '@reach/router';
import { inject, observer } from 'mobx-react';

import Menu from '../../components/menu';
import { Main, Sidebar, Wrapper } from '../../layout';
import Shares from '../../components/shares';

const Share = lazy(() => import(/* webpackChunkName: "share-routes" */ './share'));

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
