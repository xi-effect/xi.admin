/* eslint-disable no-unused-vars */
import { action, observable, makeObservable } from 'mobx';
import RootStore from '../rootStore';

type SettingsT = { loading: null | boolean };

class UISt {
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable settings: SettingsT = {
    loading: null,
  };

  @action setLoading = (name: string, value: null | boolean) => {
    this.settings[name] = value;
  };
}

export default UISt;
