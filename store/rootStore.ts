/* eslint-disable no-unused-vars */
import { action, makeObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';
import Router from 'next/router';
import UISt from './ui/uiSt';
import HomeSt from './home/homeSt';
import UserSt from './user/userSt';
import AuthorizationSt from './user/authorizationSt';
import ManageSt from './manage-mode/manageSt';

enableStaticRendering(typeof window === 'undefined');

let store;

type MethodT = 'GET' | 'POST' | 'DELETE' | 'PATCH';

class RootStore {
  uiSt: UISt;

  homeSt: HomeSt;

  userSt: UserSt;

  manageSt: ManageSt;

  authorizationSt: AuthorizationSt;

  url = process.env.NEXT_PUBLIC_SERVER_URL;

  constructor() {
    this.uiSt = new UISt(this);
    this.homeSt = new HomeSt(this);
    this.userSt = new UserSt(this);
    this.manageSt = new ManageSt(this);
    this.authorizationSt = new AuthorizationSt(this);

    makeObservable(this);
  }

  @action fetchData = async (url: string, method: MethodT, data?: any) => {
    try {
      const URL = `${this.url}${url}`;
      let response: null | Response = null;

      if (data) {
        response = await fetch(URL, {
          method,
          cache: 'no-cache',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch(URL, {
          method,
          credentials: 'include',
        });
      }

      if (response?.status === 401 || response?.status === 403 || response?.status === 422) {
        const router = Router;
        await router.push('/');
        return null;
      }

      if (response?.ok) {
        const string = await response?.text();
        const json = string === '' ? {} : JSON.parse(string);
        return json;
      }

      const string = await response?.text();
      return string && (string === '' ? {} : JSON.parse(string));
    } catch (error) {
      return console.log('Возникла проблема с вашим fetch запросом: ', error.message);
    }
  };
}

function initializeStore(initialData = null) {
  // eslint-disable-next-line no-underscore-dangle
  const _store = store ?? new RootStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here
  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export default RootStore;
