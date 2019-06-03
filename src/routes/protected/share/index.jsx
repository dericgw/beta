import React, { lazy } from 'react';
import { Router } from '@reach/router';

const Create = lazy(() => import(/* webpackChunkName: "share.create" */ './create'));

const ShareRoutes = () => (
  <Router className="router">
    <Create path="/" />
  </Router>
);

export default ShareRoutes;
