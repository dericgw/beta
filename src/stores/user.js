import { observable, action, computed } from 'mobx';
import * as firebase from 'firebase/app';
import pick from 'lodash/pick';

import User from './models/user';

export default class UserStore {
  @observable user = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed
  get isAuthed() {
    return this.user;
  }

  @action
  attemptAuth() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.update(user);
    }

    return this.isAuthed;
  }

  @action
  update(user) {
    this.user = new User(this, pick(user, ['uid', 'displayName', 'email']));
  }

  @action
  watchAuthState() {
    return firebase.auth().onAuthStateChanged(user => {
      if (!!user) {
        this.update(user);
      } else {
        this.update(null);
      }
    });
  }
}
