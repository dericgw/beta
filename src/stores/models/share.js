import { observable } from 'mobx';

export default class Share {
  @observable id;
  @observable title;
  @observable recipient;
  @observable link;
  @observable hasBeenViewed = false;

  constructor({ id, title, recipient, link, hasBeenViewed }) {
    this.id = id;
    this.title = title;
    this.recipient = recipient;
    this.link = link;
    this.hasBeenViewed = hasBeenViewed;
  }
}
