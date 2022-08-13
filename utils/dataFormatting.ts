export const dataFormatting = (sections: SectionsT) => {
  const resultSection = {};

  for (const s of sections) {
    const resultPermissions = {};

    resultSection[s.name] = resultPermissions;

    for (const p of s.permissions) {
      resultPermissions[p.name] = true;
    }
  }

  return resultSection;
};

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

type PermissionsDataT = { [key in PermissionsT]?: boolean };

export type SectionsDataT = { [key in PermissionsUserRoleT]?: PermissionsDataT };
