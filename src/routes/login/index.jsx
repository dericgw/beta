import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import * as firebase from 'firebase/app';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Redirect } from '@reach/router';

const authConfig = {
  signInSuccessUrl: '/share',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

@inject('user')
@observer
class Login extends Component {
  unregisterAuthObserver = () => {};

  componentDidMount() {
    this.unregisterAuthObserver = this.props.user.watchAuthState();
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { user } = this.props;

    console.log(user);

    return user.isAuthed ? (
      <Redirect to="/share" noThrow />
    ) : (
      <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()} />
    );
  }
}

export default Login;
