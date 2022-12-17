import { action, observable, makeObservable } from 'mobx';
import Router from 'next/router';
import { formatSectionData, ResponseDataT } from 'utils/dataFormatting';
import RootStore from '../rootStore';

type LoginErrorsT = {
  username: null | string;
  password: null | string;
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

  @observable loginErrors: LoginErrorsT = {
    username: null,
    password: null,
  };

  @action logoutUser = async () => {
    this.rootStore.uiSt.setLoading('loading', true);

    await this.rootStore.fetchData(`/mub/sign-out/`, 'POST');

    await Router.push('/');

    this.rootStore.uiSt.setLoading('loading', false);
  };

  @action setLoginErrors = (name, value) => {
    this.loginErrors[name] = value;
  };

  @action setData = (data?: ResponseDataT) => {
    if (data) {
      this.rootStore.userSt.settings = {
        ...data,
        auth: true,
        sections: formatSectionData(data.sections),
      };
    }
  };

  @action getSettings = async () => {
    this.rootStore.uiSt.setLoading('loading', true);

    const data = await this.rootStore.fetchData(`/mub/my-settings/`, 'GET');

    this.setData(data);

    setTimeout(() => {
      this.rootStore.uiSt.setLoading('loading', false);
    }, 1500);
  };

  @action setSettings = async (mode: 'dark' | 'light') => {
    await this.rootStore.fetchData(`/mub/my-settings/?mode=${mode}`, 'POST');

    this.rootStore.userSt.settings.mode = mode;
  };

  @action loginUser = async (data: DataT) => {
    this.setLoginErrors('error', null);

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
          this.setLoginErrors('password', null);
          this.setLoginErrors('username', null);
        }, 1500);
      } else if (resData === 'Moderator does not exist') {
        this.setLoginErrors('username', 'Не удалось найти аккаунт');
      } else if (resData === 'Wrong password') {
        this.setLoginErrors('password', 'Неправильный пароль');
      }
    } else {
      this.setLoginErrors('error', 'Server error');
    }
  };
}

export default AuthorizationSt;
