import { types, getRoot } from 'mobx-state-tree';
import * as firebase from 'firebase/app';

const Share = types.model('Share', {
  id: types.identifier,
  title: types.string,
  recipient: types.string,
  link: types.string,
  hasBeenViewed: types.boolean,
});

const ShareStore = types
  .model('ShareStore', {
    shares: types.array(Share),
    uploadProgress: 0,
  })
  .actions(self => ({
    create(share) {
      self.shares.push(Share.create(share));
    },

    upload(files, userId) {
      const storage = firebase.storage().ref();
      files.forEach(file => {
        this.setState({ task: storage.child(`songs/${userId}/${file.name}`).put(file) });
        this.state.task.on(
          'state_changed',
          snapshot => {
            const percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * (1 / files.length);
            this.setState({ progress: percentage });
          },
          error => {
            throw error;
          },
          () => {
            this.setState({ progress: 0, task: null, completed: true });
          },
        );
      });
    },

    cancelUpload() {},
  }));

export default ShareStore;
