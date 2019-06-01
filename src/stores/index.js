import UserStore from './user';
import SharesStore from './shares';

export default class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.sharesStore = new SharesStore(this);
  }
}
