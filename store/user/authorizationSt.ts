/* eslint-disable no-unused-vars */
import { action, observable, makeObservable } from 'mobx';
import Router from 'next/router';
import { formatSectionData, ResponseDataT } from 'utils/dataFormatting';
import RootStore from '../rootStore';

type LoginT = {
  error: null | string;
};

type DataT = {
  username: string;
  password: string;
};

class AuthorizationSt {
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable login: LoginT = {
    error: null,
  };

  @action logoutUser = async () => {
    await this.rootStore.fetchData(`${this.rootStore.url}/mub/sign-out/`, 'POST');

    await Router.push('/');
  };

  @action setLogin = (name, value) => {
    this.login[name] = value;
  };

  @action setData = (data: ResponseDataT) => {
    const { id, mode, sections, username } = data;

    this.rootStore.userSt.setSettings('id', id);
    this.rootStore.userSt.setSettings('mode', mode);
    this.rootStore.userSt.setSettings('auth', true);
    this.rootStore.userSt.setSettings('username', username);
    this.rootStore.userSt.setSettings('sections', formatSectionData(sections));
  };

  @action getSettings = async () => {
    this.rootStore.uiSt.setLoading('loading', true);

    const data = await this.rootStore.fetchData(`/mub/my-settings/`, 'GET');
    if (data) {
      this.setData(data);
    }

    setTimeout(() => {
      this.rootStore.uiSt.setLoading('loading', false);
    }, 1500);
  };

  @action loginUser = async (data: DataT, trigger: any) => {
    this.setLogin('error', null);

    const resData = await this.rootStore.fetchData(`/mub/sign-in/`, 'POST', {
      username: data.username,
      password: data.password,
    });

    if (resData !== undefined) {
      if (resData.id) {
        this.rootStore.uiSt.setLoading('loading', true);

        this.setData(resData);

        await Router.push('/home');

        setTimeout(() => {
          this.rootStore.uiSt.setLoading('loading', false);
        }, 1500);
      } else if (resData.a === "User doesn't exist") {
        this.setLogin('error', "User doesn't exist");
        trigger();
      } else if (resData.a === 'Wrong password') {
        this.setLogin('error', 'Wrong password');
        trigger();
      }
    } else {
      this.setLogin('error', 'Server error');
      trigger();
    }
  };
}

export default AuthorizationSt;
