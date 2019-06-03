import { observable, action, computed } from 'mobx';
import pick from 'lodash/pick';
import noop from 'lodash/noop';

import User from './models/user';

export default class UserStore {
  @observable user = null;

  cleanUpWatchAuthState = noop;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.auth = this.rootStore.firebase.auth;
    this.watchAuthState();
  }

  @computed
  get isAuthed() {
    return this.user;
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
    this.cleanUpWatchAuthState = this.auth().onAuthStateChanged(user => {
      if (user) {
        this.update(user);
      } else {
        this.update(null);
      }
    });
  }
}
