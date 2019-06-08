import { observable, action, computed } from 'mobx';

import UserStore from './user';
import SharesStore from './shares';

export default class RootStore {
  @observable entryUrl;

  constructor(firebase) {
    this.firebase = firebase;
    this.userStore = new UserStore(this);
    this.sharesStore = new SharesStore(this);
  }

  @computed
  get redirectTo() {
    return this.entryUrl === '/' ? '/share' : this.entryUrl;
  }

  @action
  updateEntryUrl(url) {
    if (url) {
      this.entryUrl = url;
    }
  }
}
