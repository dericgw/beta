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

@inject('store')
@observer
class Login extends Component {
  unregisterAuthObserver = () => {};

  componentDidMount() {
    this.unregisterAuthObserver = this.props.store.userStore.watchAuthState();
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { store } = this.props;

    console.log(store);

    return store.userStore.isAuthed ? (
      <Redirect to="/share" noThrow />
    ) : (
      <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()} />
    );
  }
}

export default Login;
