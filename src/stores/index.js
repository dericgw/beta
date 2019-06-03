import UserStore from './user';
import SharesStore from './shares';

export default class RootStore {
  constructor(firebase) {
    this.firebase = firebase;
    this.userStore = new UserStore(this);
    this.sharesStore = new SharesStore(this);
  }
}
