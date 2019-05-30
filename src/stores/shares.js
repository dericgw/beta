import { types } from 'mobx-state-tree';
import * as firebase from 'firebase/app';

const Share = types.model('Share', {
  id: types.identifier,
  title: types.string,
  recipient: types.maybeNull(types.string),
  link: types.string,
  hasBeenViewed: false,
});

const ShareStore = types
  .model('ShareStore', {
    shares: types.array(Share),
    uploadProgress: 0,
    uploadCompleted: false,
  })
  .actions(self => {
    let uploadTask = null;

    const create = async share => {
      const db = firebase.firestore();
      try {
        const { id } = await db.collection('songs').add(share);
        self.shares.push(Share.create({ id, ...share }));
      } catch (error) {
        throw new Error(error);
      }
    };

    const upload = (files, userId) => {
      const storage = firebase.storage().ref();
      files.forEach(file => {
        const songName = file.name;
        uploadTask = storage.child(`songs/${userId}/${songName}`).put(file);

        uploadTask.on(
          'state_changed',
          snapshot => {
            self.uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * (1 / files.length);
          },
          error => {
            throw error;
          },
          async () => {
            self.uploadProgress = 0;
            self.uploadCompleted = true;
            try {
              const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
              self.create({
                userId,
                link: downloadUrl,
                title: songName,
                hasBeenViewed: false,
              });
            } catch (error) {
              throw new Error(error);
            }
          },
        );
      });
    };

    const cancelUpload = () => {
      if (uploadTask) {
        uploadTask.cancel();
      }
    };

    return {
      create,
      upload,
      cancelUpload,
    };
  });

export default ShareStore;
