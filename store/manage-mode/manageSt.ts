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
  name: string;
};

type ModeratorDataT = {
  username: string;
  password: string;
  'append-perms': number[];
  'remove-perms': number[];
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

  @action getModerators = async (offset?: string, counter?: string) => {
    const res = await this.rootStore.fetchData(`/mub/moderators/?offset=0`, 'GET');

    this.data.users = res.results;
    this.data['has-next'] = res['has-next'];
  };

  @action getPermissions = async () => {
    this.data.globalPermissions = await this.rootStore.fetchData(`/mub/permissions/`, 'GET');
  };

  @action deleteModerator = async (id: number) => {
    await this.rootStore.fetchData(`/mub/moderators/${id}/`, 'DELETE');

    await this.getModerators();
  };

  @action updateModerator = async (data: ModeratorDataT & { id: number }) => {
    const { id, ...requestData } = data;
    await this.rootStore.fetchData(`/mub/moderators/${id}/`, 'POST', requestData);

    await this.getModerators();
  };

  @action createModerator = async (data: ModeratorDataT) => {
    await this.rootStore.fetchData(`/mub/moderators/`, 'POST', data);

    await this.getModerators();
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
