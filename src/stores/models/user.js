import { observable } from 'mobx';

export default class User {
  uid;
  @observable displayName;
  @observable email;

  constructor(store, { uid, displayName, email }) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.store = store;
    this.store.rootStore.sharesStore.fetchShares(this.uid);
  }
}
