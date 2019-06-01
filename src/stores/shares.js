import * as firebase from 'firebase/app';
import { observable, action } from 'mobx';
import Share from './models/share';

export default class SharesStore {
  @observable shares = [];
  @observable uploadProgress = 0;
  @observable uploadCompleted = false;
  @observable uploadSongName;
  @observable lastShare = {};
  uploadTask = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async create(share) {
    const db = firebase.firestore();
    try {
      const { id } = await db.collection('songs').add(share);
      this.addShare({ id, ...share });
    } catch (error) {
      throw new Error(error);
    }
  }

  @action
  addShare = share => {
    this.lastShare = new Share(share);
    this.shares.push(this.lastShare);
  };

  @action
  upload(files, userId) {
    const storage = firebase.storage().ref();
    this.uploadCompleted = false;
    const [file] = files;
    this.uploadSongName = file.name;
    this.uploadTask = storage.child(`songs/${userId}/${this.uploadSongName}`).put(file);

    this.uploadTask.on(
      'state_changed',
      snapshot => {
        this.uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * (1 / files.length);
      },
      error => {
        throw error;
      },
      () => {
        this.uploadProgress = 0;
        this.uploadCompleted = true;
        this.uploadTask.snapshot.ref
          .getDownloadURL()
          .then(downloadUrl => {
            this.create({
              userId,
              link: downloadUrl,
              title: this.uploadSongName,
              hasBeenViewed: false,
            });
          })
          .catch(error => {
            throw new Error(error);
          });
      },
    );
  }

  cancelUpload() {
    if (this.uploadTask) {
      this.uploadTask.cancel();
    }
  }

  @action
  updateUploadProgress(progress) {
    this.uploadProgress = progress;
  }

  @action
  updateUploadCompleted(isComplete) {
    this.uploadCompleted = isComplete;
  }

  @action
  updateUploadSongName(name) {
    this.uploadSongName = name;
  }

  @action
  async fetchShares(userId) {
    this.clearShares();
    const db = firebase.firestore();
    const shares = await db
      .collection('songs')
      .where('userId', '==', userId)
      .get();

    if (!shares.empty) {
      const newShares = shares.docs.map(doc => {
        const { id } = doc;
        const { userId, ...share } = doc.data();
        return { id, ...share };
      });

      this.shares.replace(newShares);
    }
  }

  @action
  clearShares = () => {
    this.shares.replace([]);
  };
}
