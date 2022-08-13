import { action, observable, makeObservable } from 'mobx';

class UserSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable settings = {
    id: null,
    username: '',
    darkTheme: true,
    sections: {},
  };

  @action setSettings = (item, value) => {
    this.settings[item] = value;
  };

  @action setSettingsSecond = (item, secondItem, value) => {
    this.settings[item][secondItem] = value;
  };
}

export default UserSt;
