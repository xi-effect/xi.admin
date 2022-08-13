/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import { action, observable, makeObservable } from 'mobx';
import Router from 'next/router';
import { dataFormatting } from 'utils/dataFormatting';

class AuthorizationSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable auth = undefined;

  @observable newPasswordReset = {
    emailResetOk: false,
  };

  @observable login = {
    error: null,
  };

  @action setNewPasswordReset = (name, value) => {
    this.newPasswordReset[name] = value;
  };

  @action getSettings = async () => {
    try {
      this.rootStore.uiSt.setLoading('loading', true);

      const data = await this.rootStore.fetchData(`${this.rootStore.url}/mub/my-settings/`, 'GET');

      if (data !== undefined) {
        const { id, mode, sections } = data;

        this.rootStore.auth = true;
        this.rootStore.userSt.setSettings('id', id);
        this.rootStore.userSt.setSettings('mode', mode);
        this.rootStore.userSt.setSettings('sections', dataFormatting(sections));
      }

      setTimeout(() => {
        this.rootStore.uiSt.setLoading('loading', false);
      }, 1500);
    } catch (e) {
      console.log(e);
      Router.push('/');
    }
  };

  @action logout = () => {
    this.rootStore.fetchData(`${this.rootStore.url}/mub/sign-out/`, 'POST').then(() => {
      Router.push('/');
    });
  };

  @action setLogin = (name, value) => {
    this.login[name] = value;
  };

  @action clickEnterButton = (data, trigger) => {
    this.setLogin('error', null);
    this.rootStore
      .fetchData(`${this.rootStore.url}/mub/sign-in/`, 'POST', {
        username: data.username,
        password: data.password,
      })
      .then((data) => {
        if (data !== undefined) {
          if (data.id) {
            this.rootStore.uiSt.setLoading('loading', true);

            const { id, mode, sections } = data;
            this.rootStore.auth = true;
            this.rootStore.userSt.setSettings('id', id);
            this.rootStore.userSt.setSettings('mode', mode);
            this.rootStore.userSt.setSettings('sections', dataFormatting(sections));
            Router.push('/home');
            setTimeout(() => {
              this.rootStore.uiSt.setLoading('loading', false);
            }, 1500);
          } else if (data.a === 'User doesn\'t exist') {
            this.setLogin('error', 'User doesn\'t exist');
            trigger();
          } else if (data.a === 'Wrong password') {
            this.setLogin('error', 'Wrong password');
            trigger();
          }
        } else {
          this.setLogin('error', 'Server error');
          trigger();
        }
      });
  };
}

export default AuthorizationSt;
