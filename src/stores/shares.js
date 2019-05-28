import { types } from 'mobx-state-tree';

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
  })
  .actions(self => ({
    create(share) {
      self.shares.push(Share.create(share));
    },
  }));

export default ShareStore;
