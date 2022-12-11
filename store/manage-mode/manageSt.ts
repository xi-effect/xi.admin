import { action, makeObservable, observable } from 'mobx';
import { PermissionsNameT } from 'utils/dataFormatting';
import RootStore from '../rootStore';

export type ModeratorsT = {
  id: number;
  super: boolean;
  username: string;
  permissions: { id: number; name: PermissionsNameT }[];
};

export type FilesT = {
  filename: string;
  id: number;
};

type StorageT = {
  moderators: {
    data: ModeratorsT[];
    'has-next': boolean;
    globalPermissions: PermissionsT[];
  };
  files: {
    data: FilesT[];
    'has-next': boolean;
  };
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

  @observable storage: StorageT = {
    moderators: {
      data: [],
      'has-next': false,
      globalPermissions: [],
    },
    files: {
      data: [],
      'has-next': false,
    },
  };

  @observable currentModerator: CurrentModeratorT = {
    id: null,
    current: null,
    permissions: [],
  };

  @observable controlModals: ControlModalsT = {
    main: false,
    confirmation: false,
    variant: 'creation',
  };

  @action getFiles = async () => {
    const res = await this.rootStore.fetchData(
      `/mub/files/index/?offset=${this.storage.files.data.length}`,
      'POST'
    );

    this.storage.files['has-next'] = res['has-next'];
    this.storage.files.data.push(...res.results);
  };

  @action deleteFiles = async (id: number) => {
    await this.rootStore.fetchData(`/mub/files/${id}/`, 'DELETE');

    this.storage.files.data = this.storage.files.data.filter((u) => u.id !== id);
  };

  @action getModerators = async (search?: string, newSearch?: boolean) => {
    const res = await this.rootStore.fetchData(
      `/mub/moderators/?offset=${newSearch ? 0 : this.storage.moderators.data.length}
      ${search ? `&search=${search}` : ''}`,
      'GET'
    );

    this.storage.moderators['has-next'] = res['has-next'];

    if (newSearch) {
      this.storage.moderators.data = res.results;
    } else {
      this.storage.moderators.data.push(...res.results);
    }
  };

  @action getPermissions = async () => {
    this.storage.moderators.globalPermissions = await this.rootStore.fetchData(
      `/mub/permissions/`,
      'GET'
    );
  };

  @action deleteModerator = async (id: number) => {
    await this.rootStore.fetchData(`/mub/moderators/${id}/`, 'DELETE');

    this.storage.moderators.data = this.storage.moderators.data.filter((u) => u.id !== id);
  };

  @action updateModerator = async (
    data: ModeratorDataT & { id: number; 'remove-perms': number[] }
  ) => {
    const { id, ...reqData } = data;

    await this.rootStore.fetchData(`/mub/moderators/${id}/`, 'POST', reqData);

    this.storage.moderators.data = this.storage.moderators.data.map((u) =>
      u.id === id
        ? {
            ...u,
            username: reqData.username,
            permissions: u.permissions
              .filter((p) => !reqData['remove-perms'].includes(p.id))
              .concat(
                this.storage.moderators.globalPermissions.filter((p) =>
                  reqData['append-perms'].includes(p.id)
                )
              ),
          }
        : u
    );
  };

  @action createModerator = async (data: ModeratorDataT) => {
    const user = await this.rootStore.fetchData(`/mub/moderators/`, 'POST', data);

    this.storage.moderators.data.push(user);
  };

  @action toggleModal = (modal: 'main' | 'confirmation', value: boolean) => {
    this.controlModals[modal] = value;
  };

  @action changeModalVariant = (variant: VariantT) => {
    this.controlModals.variant = variant;
  };

  @action changeUser = (current: CurrentModeratorT | null) => {
    if (current) {
      this.currentModerator = current;
      return;
    }

    this.currentModerator = { current: null, id: null, permissions: [] };
  };
}

export default ManageSt;
