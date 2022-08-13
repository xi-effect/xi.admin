type SectionsT = {
  id: number;
  name: PermissionsUserRoleT;
  permissions: {
    id: number;
    name: PermissionsT;
  }[];
}[];

type PermissionsT = 'manage mods' | 'emailing' | 'manage';

type PermissionsUserRoleT = 'super' | 'quality assurance' | 'users';

type CheckUserT<A> = (options: { sections: SectionsT; arg: A }) => boolean;

export const checkUserRole: CheckUserT<PermissionsUserRoleT> = ({ sections, arg }) =>
  !!sections.filter((p) => p.name === arg).length;

export const checkUserPermissions: CheckUserT<PermissionsT> = ({ sections, arg }) =>
  !!sections.filter((p) => p.permissions.length && p.permissions[0].name === arg).length;
