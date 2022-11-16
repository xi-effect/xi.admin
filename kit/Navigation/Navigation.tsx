import React, { FunctionComponent } from 'react';
import UserSt from 'store/user/userSt';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { Stack, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import NotEnoughRights from '../Layout/NotEnoughRights';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false }) as FunctionComponent;

type NavigationT = {
  userSt: UserSt;
  children: React.ReactNode;
};

const Navigation = inject('userSt')(
  observer((props) => {
    const router = useRouter();

    const {
      children,
      userSt: {
        settings: { sections },
      },
    }: NavigationT = props;

    if (
      (router.pathname === '/qa' && !sections['quality assurance']?.emailing) ||
      (router.pathname === '/manage-mode' && !sections.super?.['manage mods']) ||
      (router.pathname === '/manage-mode/files' &&
        !sections['content management']?.['manage files'])
    ) {
      return <NotEnoughRights />;
    }

    return (
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          zIndex: 0,
          backgroundColor: 'background.main',
          height: '100vh',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Sidebar />
        <Box
          sx={{
            zIndex: 0,
            backgroundColor: 'background.main',
            height: '100vh',
            overflow: 'hidden',
            width: `100%`,
          }}
        >
          {children}
        </Box>
      </Stack>
    );
  })
);

export default Navigation;
