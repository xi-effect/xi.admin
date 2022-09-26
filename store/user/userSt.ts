/* eslint-disable no-unused-vars */
import { action, observable, makeObservable } from 'mobx';
import { FormatSectionDataT } from 'utils/dataFormatting';
import RootStore from '../rootStore';

type SettingsUserStoreT = {
  auth: boolean;
  id: null | number;
  username: string;
  mode: 'dark' | 'light';
  sections: FormatSectionDataT;
};

class UserSt {
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable settings: SettingsUserStoreT = {
    id: null,
    auth: false,
    username: '',
    mode: 'dark',
    sections: {},
  };

  @action setSettings = (item: string, value: any) => {
    this.settings[item] = value;
  };
}

export default UserSt;
