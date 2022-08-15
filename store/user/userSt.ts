/* eslint-disable no-unused-vars */
import { action, observable, makeObservable } from 'mobx';
import { SectionsDataT } from 'utils/dataFormatting';
import RootStore from '../rootStore';

type SettingsUserStoreT = {
  auth: boolean,
  id: null | number
  username: string
  darkTheme: boolean
  sections: SectionsDataT
};

export type UserStoreT = {
  settings: SettingsUserStoreT
  setSettings: (item: any, value: any) => void
};

class UserSt implements UserStoreT {
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable settings = {
    auth: false,
    id: null,
    username: '',
    darkTheme: true,
    sections: {},
  };

  @action setSettings = (item, value) => {
    this.settings[item] = value;
  };
}

export default UserSt;
