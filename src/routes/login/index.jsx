import React, { useEffect, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import * as firebase from 'firebase/app';
import noop from 'lodash/noop';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Redirect } from '@reach/router';

const authConfig = {
  signInSuccessUrl: '/share',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const Login = ({ store }) => {
  const { userStore } = store;
  let unregisterAuthObserver = useRef(noop);

  useEffect(() => {
    unregisterAuthObserver.current = userStore.watchAuthState();
    return () => {
      unregisterAuthObserver.current();
    };
  });

  return userStore.isAuthed && userStore.attemptAuth ? (
    <Redirect to="/share" noThrow />
  ) : (
    <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()} />
  );
};

export default inject('store')(observer(Login));
