import { observable, makeObservable } from 'mobx';
import RootStore from '../rootStore';

class HomeSt {
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable homeSt = {};
}

export default HomeSt;
