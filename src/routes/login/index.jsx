import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Redirect } from '@reach/router';

const Login = ({ firebase, redirectTo, userStore }) => {
  const authConfig = {
    signInSuccessUrl: redirectTo,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    return () => {
      userStore.cleanUpWatchAuthState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userStore.isAuthed ? (
    <Redirect to="/share" noThrow />
  ) : (
    <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()} />
  );
};

export default inject(({ store }) => ({
  userStore: store.userStore,
  firebase: store.firebase,
  redirectTo: store.redirectTo,
}))(observer(Login));
