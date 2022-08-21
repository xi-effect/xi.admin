/* eslint-disable no-unused-vars */
export type ResponseDataT = {
  id: number;
  mode: string;
  username: string;
  sections: SectionsT;
};

type SectionsT = {
  id: number;
  name: PermissionsUserRoleT;
  permissions: {
    id: number;
    name: PermissionsNameT;
  }[];
}[];

export type PermissionsNameT = 'manage mods' | 'emailing' | 'manage' | 'manage files';

export type PermissionsUserRoleT = 'super' | 'quality assurance' | 'users';

export type PermissionsDataT = { [key in PermissionsNameT]?: boolean };

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

  for (const i in sections) {
    if (sections) {
      for (const j in sections[i]) {
        if (sections[i]) {
          result.push(j);
        }
      }
    }
  }

  return result.length ? result.join(', ') : 'Отсутствуют разрешения';
};
