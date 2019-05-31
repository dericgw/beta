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
    shares: types.optional(types.array(Share), []),
    uploadProgress: 0,
    uploadCompleted: false,
    uploadSongName: types.optional(types.string, ''),
  })
  .actions(self => {
    let uploadTask = null;

    const create = async share => {
      const db = firebase.firestore();
      try {
        const { id } = await db.collection('songs').add(share);
        self.addShare({ id, ...share });
      } catch (error) {
        throw new Error(error);
      }
    };

    const addShare = share => {
      self.shares.push(Share.create(share));
    };

    const upload = (files, userId) => {
      const storage = firebase.storage().ref();
      self.updateUploadCompleted(false);
      files.forEach(file => {
        self.updateUploadSongName(file.name);
        uploadTask = storage.child(`songs/${userId}/${self.uploadSongName}`).put(file);

        uploadTask.on(
          'state_changed',
          snapshot => {
            self.updateUploadProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * (1 / files.length),
            );
          },
          error => {
            throw error;
          },
          async () => {
            self.updateUploadProgress(0);
            self.updateUploadCompleted(true);
            try {
              const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
              self.create({
                userId,
                link: downloadUrl,
                title: self.uploadSongName,
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

    const updateUploadProgress = progress => {
      self.uploadProgress = progress;
    };

    const updateUploadCompleted = isComplete => {
      self.uploadCompleted = isComplete;
    };

    const updateUploadSongName = name => {
      self.uploadSongName = name;
    };

    const fetchShares = userId => {
      const db = firebase.firestore();
      db.collection('songs')
        .where('userId', '==', userId)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const { id } = doc;
            const { userId, ...share } = doc.data();
            self.addShare({ id, ...share });
          });
        });
    };

    return {
      create,
      upload,
      cancelUpload,
      updateUploadProgress,
      updateUploadCompleted,
      updateUploadSongName,
      addShare,
      fetchShares,
    };
  });

export default ShareStore;
