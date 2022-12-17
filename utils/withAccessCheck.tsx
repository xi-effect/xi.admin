import React, { ComponentType } from 'react';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import UserSt from '../store/user/userSt';
import NotEnoughRights from '../kit/layout/NotEnoughRights';

type WithAccessCheckT = {
  userSt: UserSt;
};

export function withAccessCheck<P>(Component: ComponentType<P>) {
  return inject('userSt')(
    observer((props) => {
      const {
        userSt: {
          settings: { sections },
        },
      }: WithAccessCheckT = props;

      const { pathname } = useRouter();

      const checkAccess =
        (pathname === '/qa' && !sections['quality assurance']?.emailing) ||
        (pathname === '/manage-mode' && !sections.super?.['manage mods']) ||
        (pathname === '/manage-mode/files' && !sections['content management']?.['manage files']);

      return checkAccess ? <NotEnoughRights /> : <Component {...props} />;
    })
  );
}
