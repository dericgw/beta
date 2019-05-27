import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';
import { Spinner } from '@blueprintjs/core';

const Share = lazy(() => import(/* webpackChunkName: "share" */ './share'));

const Routes = () => (
  <Suspense fallback={<Spinner />}>
    <Router>
      <Share path="/" />
    </Router>
  </Suspense>
);

export default Routes;
