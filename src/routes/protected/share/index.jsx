import React, { lazy } from 'react';
import { Router } from '@reach/router';

const Create = lazy(() => import(/* webpackChunkName: "share.create" */ './create'));
const Edit = lazy(() => import(/* webpackChunkName: "share.edit" */ './edit'));

const ShareRoutes = () => (
  <Router className="router">
    <Create path="/" />
    <Edit path="/:id/edit" />
  </Router>
);

export default ShareRoutes;
