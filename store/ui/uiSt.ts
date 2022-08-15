/* eslint-disable no-unused-vars */
import { action, observable, makeObservable } from 'mobx';
import RootStore from '../rootStore';

type UIStT = {
  settings: { loading: null | boolean };
  setLoading: (name: any, value: null | boolean) => void;
};

class UISt implements UIStT {
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable settings = {
    loading: null,
  };

  @action setLoading = (name, value) => {
    this.settings[name] = value;
  };
}

export default UISt;
