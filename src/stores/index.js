import { types } from 'mobx-state-tree';

import UserStore from './user';
import ShareStore from './shares';

const RootStore = types.model('RootStore', {
  userStore: types.optional(UserStore, {}),
  shareStore: types.optional(ShareStore, {}),
});

export default RootStore;
