import { observable, computed } from 'mobx';

export default class Share {
  @observable id;
  @observable title;
  @observable recipient;
  @observable link;
  @observable hasBeenViewed = false;
  @observable createdAt;

  constructor({ id, title, recipient, link, hasBeenViewed, createdAt }) {
    this.id = id;
    this.title = title;
    this.recipient = recipient;
    this.link = link;
    this.hasBeenViewed = hasBeenViewed;
    this.createdAt = createdAt;
  }

  @computed
  get sentTo() {
    return this.recipient ? this.recipient : 'No recipient selected...';
  }
}
