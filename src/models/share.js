import { observable, runInAction } from 'mobx';

class Share {
  id;
  @observable title;
  @observable recipient;
  @observable hasBeenViewed;
  @observable link;

  constructor({ id, title, recipient, hasBeenViewed, link }) {
    runInAction(() => {
      this.id = id;
      this.title = title;
      this.recipient = recipient;
      this.hasBeenViewed = hasBeenViewed;
      this.link = link;
    });
  }
}

export default Share;
