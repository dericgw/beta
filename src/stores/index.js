import User from './user';
import Shares from './shares';

class RootStore {
  constructor() {
    this.user = new User();
    this.shares = new Shares();
  }
}

export default RootStore;
