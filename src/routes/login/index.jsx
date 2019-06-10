import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Redirect } from '@reach/router';
import { Typography } from 'antd';

import { Wrapper } from './styles';

const { Title, Paragraph } = Typography;

const Login = ({ firebase, redirectTo, userStore }) => {
  const authConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    return () => {
      userStore.cleanUpWatchAuthState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userStore.isAuthed ? (
    <Redirect to={redirectTo} noThrow />
  ) : (
    <Wrapper>
      <Title level={1}>Beta</Title>
      <Paragraph>Sign in to get started!</Paragraph>
      <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()} />
    </Wrapper>
  );
};

export default inject(({ store }) => ({
  userStore: store.userStore,
  firebase: store.firebase,
  redirectTo: store.redirectTo,
}))(observer(Login));
