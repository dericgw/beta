import { getParent, getRoot, types } from 'mobx-state-tree';
import * as firebase from 'firebase/app';
import pick from 'lodash/pick';

const User = types
  .model('User', {
    uid: types.identifier,
    displayName: types.string,
    email: types.string,
  })
  .actions(self => ({
    afterAttach() {
      getRoot(self).shareStore.fetchShares(self.uid);
    },
  }));

const UserStore = types
  .model('UserStore', {
    user: types.maybeNull(User),
  })
  .views(self => ({
    get isAuthed() {
      return self.user;
    },
  }))
  .actions(self => ({
    attemptAuth() {
      const user = firebase.auth().currentUser;
      if (user) {
        self.update(user);
      }

      return self.isAuthed;
    },
    update(user) {
      self.user = User.create(pick(user, ['uid', 'displayName', 'email']));
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
