/* eslint-disable no-unused-vars */
import { action, observable, makeObservable } from 'mobx';
import { SectionsDataT } from 'utils/dataFormatting';
import RootStore from '../rootStore';

type SettingsUserStoreT = {
  auth: boolean;
  id: null | number;
  username: string;
  darkTheme: boolean;
  sections: SectionsDataT;
};

class UserSt {
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable settings: SettingsUserStoreT = {
    auth: false,
    id: null,
    username: '',
    darkTheme: true,
    sections: {},
  };

  @action setSettings = (item: string, value: any) => {
    this.settings[item] = value;
  };
}

export default UserSt;
