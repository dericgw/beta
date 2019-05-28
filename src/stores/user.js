import { computed, observable, action } from 'mobx';
import * as firebase from 'firebase/app';

export default class User {
  @observable id;
  @observable email;
  @observable displayName;

  @computed get isAuthed() {
    return !!this.email;
  }

  @action updateUser(user) {
    this.id = user.uid;
    this.email = user.email;
    this.displayName = user.displayName;
  }

  @action watchAuthState() {
    return firebase.auth().onAuthStateChanged(user => {
      if (!!user) {
        this.updateUser(user);
      } else {
        this.updateUser(null);
      }
    });
  }
}
