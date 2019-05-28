import { types } from 'mobx-state-tree';
import * as firebase from 'firebase/app';

const User = types.model('User', {
  id: types.identifier,
  displayName: types.string,
  email: types.string,
});

const UserStore = types
  .model('UserStore', {
    user: types.maybe(User),
  })
  .views(self => ({
    get isAuthed() {
      return self.user;
    },
  }))
  .actions(self => ({
    update(user) {
      self.user.id = user.uid;
      self.user.email = user.email;
      self.user.displayName = user.displayName;
    },
    watchAuthState() {
      return firebase.auth().onAuthStateChanged(user => {
        if (!!user) {
          self.update(user);
        } else {
          self.update(null);
        }
      });
    },
  }));

export default UserStore;

// class UserBAK {
//   @observable id;
//   @observable email;
//   @observable displayName;
//
//   @computed get isAuthed() {
//     return !!this.email;
//   }
//
//   @action updateUser(user) {
//     this.id = user.uid;
//     this.email = user.email;
//     this.displayName = user.displayName;
//   }
//
//   @action watchAuthState() {
//     return firebase.auth().onAuthStateChanged(user => {
//       if (!!user) {
//         this.updateUser(user);
//       } else {
//         this.updateUser(null);
//       }
//     });
//   }
// }
