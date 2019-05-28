import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';
import { Spinner } from '@blueprintjs/core';

const ProtectedRoutes = lazy(() => import(/* webpackChunkName: "protected" */ './protected'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ './login'));

const Routes = () => (
  <Suspense fallback={<Spinner />}>
    <Router>
      <Login path="/" />
      <ProtectedRoutes path="/*" />
    </Router>
  </Suspense>
);

export default Routes;
