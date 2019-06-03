import { observable, action, computed } from 'mobx';
import pick from 'lodash/pick';

import User from './models/user';

export default class UserStore {
  @observable user = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.auth = this.rootStore.firebase.auth;
  }

  @computed
  get isAuthed() {
    return this.user;
  }

  @action
  attemptAuth() {
    const user = this.auth().currentUser;
    if (user) {
      this.update(user);
    }

    return this.isAuthed;
  }

  @action
  update(user) {
    if (!user) {
      this.user = null;
    } else {
      this.user = new User(this, pick(user, ['uid', 'displayName', 'email']));
    }
  }

  @action
  watchAuthState() {
    return this.auth().onAuthStateChanged(user => {
      if (!!user) {
        this.update(user);
      } else {
        this.update(null);
      }
    });
  }
}
