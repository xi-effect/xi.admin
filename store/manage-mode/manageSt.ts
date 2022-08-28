/* eslint-disable no-unused-vars */
import { action, makeObservable, observable } from 'mobx';
import { PermissionsNameT } from 'utils/dataFormatting';
import RootStore from '../rootStore';

export type ModeratorsT = {
  id: number;
  super: boolean;
  username: string;
  permissions: { id: number; name: PermissionsNameT }[];
};

type DataT = {
  moderators: ModeratorsT[];
  'has-next': boolean;
  globalPermissions: PermissionsT[];
};

type ControlModalsT = {
  main: boolean;
  variant: VariantT;
  confirmation: boolean;
};

type CurrentModeratorT = {
  id: null | number;
  current: null | string;
  permissions: PermissionsT[];
};

export type PermissionsT = {
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
    moderators: [],
    'has-next': false,
    globalPermissions: [],
  };

  @observable moderator: CurrentModeratorT = {
    id: null,
    current: null,
    permissions: [],
  };

  @observable controlModals: ControlModalsT = {
    main: false,
    confirmation: false,
    variant: 'creation',
  };

  @action getModerators = async (search?: string, firstSearch?: boolean) => {
    const res = await this.rootStore.fetchData(
      `/mub/moderators/?offset=${(search || search === '') ? 0 : this.data.moderators.length}${search ? `&search=${search}` : ''}`,
      'GET',
    );

    this.data['has-next'] = res['has-next'];

    if (firstSearch) {
      this.data.moderators = res.results;
    } else {
      this.data.moderators.push(...res.results);
    }
  };

  @action getPermissions = async () => {
    this.data.globalPermissions = await this.rootStore.fetchData(`/mub/permissions/`, 'GET');
  };

  @action deleteModerator = async (id: number) => {
    await this.rootStore.fetchData(`/mub/moderators/${id}/`, 'DELETE');

    this.data.moderators.filter((u) => u.id !== id);
  };

  @action updateModerator = async (
    data: ModeratorDataT & { id: number; 'remove-perms': number[] },
  ) => {
    const { id, ...reqData } = data;

    await this.rootStore.fetchData(`/mub/moderators/${id}/`, 'POST', reqData);

    this.data.moderators = this.data.moderators.map((u) =>
      u.id === id
        ? {
          ...u,
          username: reqData.username,
          permissions: u.permissions
            .filter((p) => !reqData['remove-perms'].includes(p.id))
            .concat(
              this.data.globalPermissions.filter((p) => reqData['append-perms'].includes(p.id)),
            ),
        }
        : u,
    );
  };

  @action createModerator = async (data: ModeratorDataT) => {
    const user = await this.rootStore.fetchData(`/mub/moderators/`, 'POST', data);

    this.data.moderators.push(user);
  };

  @action toggleModal = (modal: 'main' | 'confirmation', value: boolean) => {
    this.controlModals[modal] = value;
  };

  @action changeModalVariant = (variant: VariantT) => {
    this.controlModals.variant = variant;
  };

  @action changeUser = (current: CurrentModeratorT | null) => {
    if (current) {
      this.moderator = current;
      return;
    }

    this.moderator = { current: null, id: null, permissions: [] };
  };
}

export default ManageSt;
