import React from 'react';
import UserSt from 'store/user/userSt';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { Stack, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import NotEnoughRights from '../Layout/NotEnoughRights';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

type NavigationT = {
  userSt: UserSt;
  children: React.ReactNode;
};

const Navigation = inject('userSt')(
  observer((props) => {
    const {
      children,
      userSt: { settings: { sections } },
    }: NavigationT = props;

    if (Router.pathname === '/qa' && !sections['quality assurance']?.emailing) {
      return <NotEnoughRights />;
    }

    return (
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={2}
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
  }),
);

export default Navigation;
