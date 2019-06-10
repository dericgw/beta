import { observable, action, computed, runInAction } from 'mobx';
import find from 'lodash/find';

import Share from './models/share';

export default class SharesStore {
  @observable shares = observable([]);
  @observable uploadProgress = 0;
  @observable uploadCompleted = false;
  @observable uploadSongName;
  @observable lastShare = {};
  @observable shareToEditId = null;
  uploadTask = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    const { firestore, storage, functions } = this.rootStore.firebase;
    this.db = firestore();
    this.storage = storage();
    this.functions = functions();
  }

  @computed
  get shareLink() {
    return `/share/${this.lastShare.id}`;
  }

  @computed
  get serializedShares() {
    return this.shares.toJS();
  }

  @computed
  get shareToEdit() {
    return find(this.shares, { id: this.shareToEditId });
  }

  @action('shares | updateShareToEditId')
  updateShareToEditId = id => {
    this.shareToEditId = id;
  };

  async fetchById(id) {
    try {
      const song = await this.db
        .collection('songs')
        .doc(id)
        .get();
      return song.data();
    } catch (error) {
      throw new Error(error);
    }
  }

  async markSongAsViewed(songId) {
    try {
      const markSongAsViewed = this.functions.httpsCallable('markSongAsViewed');
      await markSongAsViewed({ songId });
    } catch (error) {
      throw new Error(error);
    }
  }

  @action('shares | create')
  async create(share) {
    try {
      const { id } = await this.db.collection('songs').add(share);
      this.addShare({ id, ...share });
    } catch (error) {
      throw new Error(error);
    }
  }

  @action('shares | addShare')
  addShare = share => {
    this.lastShare = new Share(share);
    this.shares.push(this.lastShare);
  };

  @action('shares | upload')
  upload(files, userId) {
    const storage = this.storage.ref();
    this.uploadCompleted = false;
    const [file] = files;
    this.uploadSongName = file.name;
    this.uploadTask = storage.child(`songs/${userId}/${this.uploadSongName}`).put(file);

    this.uploadTask.on(
      'state_changed',
      snapshot => {
        runInAction(() => {
          this.uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * (100 / files.length);
        });
      },
      error => {
        throw error;
      },
      () => {
        runInAction(async () => {
          this.uploadProgress = 0;
          this.uploadCompleted = true;
          const downloadUrl = await this.uploadTask.snapshot.ref.getDownloadURL();
          await this.create({
            userId,
            link: downloadUrl,
            title: this.uploadSongName,
            hasBeenViewed: false,
            recipient: null,
            createdAt: new Date(),
          });
        });
      },
    );
  }

  cancelUpload() {
    if (this.uploadTask) {
      this.uploadTask.cancel();
    }
  }

  @action('shares |  updateUploadProgress')
  updateUploadProgress(progress) {
    this.uploadProgress = progress;
  }

  @action('shares | updateUploadCompleted')
  updateUploadCompleted(isComplete) {
    this.uploadCompleted = isComplete;
  }

  @action('shares | updateUploadSongName')
  updateUploadSongName(name) {
    this.uploadSongName = name;
  }

  @action('shares | fetchShares')
  async fetchShares(userId) {
    const shares = await this.db
      .collection('songs')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    if (!shares.empty) {
      const newShares = shares.docs.map(doc => {
        const { id } = doc;
        const { userId, ...share } = doc.data();
        return new Share({ id, ...share });
      });
      runInAction(() => {
        this.shares.replace(newShares);
      });
    }
  }

  @action('shares | deleteShare')
  deleteShare = id => {
    console.log(id);
  };
}
