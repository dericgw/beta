import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';
import { Spinner } from '@blueprintjs/core';

const ProtectedRoutes = lazy(() => import(/* webpackChunkName: "protected" */ './protected'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ './login'));
const View = lazy(() => import(/* webpackChunkName: "share.view" */ './view'));

const Routes = () => (
  <Suspense fallback={<Spinner />}>
    <Router className="router">
      <Login path="/" />
      <ProtectedRoutes path="/*" />
      <View path="/share/:id" />
    </Router>
  </Suspense>
);

export default Routes;
