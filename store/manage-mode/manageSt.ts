/* eslint-disable no-unused-vars */
import { action, makeObservable, observable } from 'mobx';
import { PermissionsNameT } from 'utils/dataFormatting';
import RootStore from '../rootStore';

export type UsersT = {
  id: number;
  super: boolean;
  username: string;
  permissions: { id: number; name: PermissionsNameT }[];
};

type DataT = {
  users: UsersT[];
  'has-next': boolean;
  globalPermissions: PermissionsT[];
};

type ControlModalsT = {
  main: boolean;
  variant: VariantT;
  confirmation: boolean;
};

type CurrentUserT = {
  id: null | number;
  current: null | string;
  permissions: PermissionsT[];
};

type PermissionsT = {
  id: number;
  name: PermissionsNameT;
};

type ModeratorDataT = {
  username: string;
  password: string;
  'append-perms': number[];
};

type VariantT = 'creation' | 'editing';

class ManageSt {
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable data: DataT = {
    users: [],
    'has-next': false,
    globalPermissions: [],
  };

  @observable user: CurrentUserT = {
    id: null,
    current: null,
    permissions: [],
  };

  @observable controlModals: ControlModalsT = {
    main: false,
    confirmation: false,
    variant: 'creation',
  };

  @action getModerators = async () => {
    const res = await this.rootStore.fetchData(
      `/mub/moderators/?offset=${this.data.users.length}`,
      'GET'
    );

    this.data.users.push(...res.results);
    this.data['has-next'] = res['has-next'];
  };

  @action searchUser = async (search: string) => {
    if (search === '') {
      await this.getModerators();
      return;
    }

    const res = await this.rootStore.fetchData(`/mub/moderators/?offset=0&search=${search}`, 'GET');
    this.data.users = res.results;
    this.data['has-next'] = res['has-next'];
  };

  @action getPermissions = async () => {
    this.data.globalPermissions = await this.rootStore.fetchData(`/mub/permissions/`, 'GET');
  };

  @action deleteModerator = async (id: number) => {
    await this.rootStore.fetchData(`/mub/moderators/${id}/`, 'DELETE');

    this.data.users.filter((u) => u.id !== id);
  };

  @action updateModerator = async (
    data: ModeratorDataT & { id: number; 'remove-perms': number[] }
  ) => {
    const { id, ...reqData } = data;

    await this.rootStore.fetchData(`/mub/moderators/${id}/`, 'POST', reqData);

    this.data.users = this.data.users.map((u) =>
      u.id === id
        ? {
            ...u,
            username: reqData.username,
            permissions: u.permissions
              .filter((p) => !reqData['remove-perms'].includes(p.id))
              .concat(
                this.data.globalPermissions.filter((p) => reqData['append-perms'].includes(p.id))
              ),
          }
        : u
    );
  };

  @action createModerator = async (data: ModeratorDataT) => {
    const user = await this.rootStore.fetchData(`/mub/moderators/`, 'POST', data);

    this.data.users.push(user);
  };

  @action toggleModal = (modal: 'main' | 'confirmation', value: boolean) => {
    this.controlModals[modal] = value;
  };

  @action changeModalVariant = (variant: VariantT) => {
    this.controlModals.variant = variant;
  };

  @action changeUser = (current: CurrentUserT | null) => {
    if (current) {
      this.user = current;
      return;
    }

    this.user = { current: null, id: null, permissions: [] };
  };
}

export default ManageSt;
