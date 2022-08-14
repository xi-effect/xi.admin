type SectionsT = {
  id: number;
  name: PermissionsUserRoleT;
  permissions: {
    id: number;
    name: PermissionsT;
  }[];
}[];

export type PermissionsT = 'manage mods' | 'emailing' | 'manage';

export type PermissionsUserRoleT = 'super' | 'quality assurance' | 'users';

export type PermissionsDataT = { [key in PermissionsT]?: boolean };

export type SectionsDataT = { [key in PermissionsUserRoleT]?: PermissionsDataT };

export const formatSectionData = (sections: SectionsT): SectionsDataT => {
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

export const formatAccessData = (sections: SectionsDataT) => {
  const result: string[] = [];

  for (const key in sections) {
    if (sections) result.push(key);
  }

  return result.length ? result.join(', ') : 'Отсутствуют разрешения';
};
