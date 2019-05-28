import { observable, action } from 'mobx';

import Share from '../models/share';

class Shares {
  @observable shares = [];

  @action create(share) {
    this.shares.push(new Share(share));
  }
}

export default Shares;
