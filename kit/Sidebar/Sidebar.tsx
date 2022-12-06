import React from 'react';
import UserSt from 'store/user/userSt';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { Stack, Box, useMediaQuery, Theme } from '@mui/material';
import AboutModerator from 'components/Sidebar/AboutModerator';
import NotEnoughRights from '../Layout/NotEnoughRights';
import Nav from './Nav';

type NavigationT = {
  userSt: UserSt;
  children: React.ReactNode;
};

const Sidebar = inject('userSt')(
  observer((props) => {
    const {
      children,
      userSt: {
        settings: { sections },
      },
    }: NavigationT = props;

    const router = useRouter();

    const md = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

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
        alignItems='flex-start'
        justifyContent='flex-start'
        sx={{
          width: '100%',
          maxWidth: 1257,
          margin: '0 auto',
          padding: '65px 10px 120px 10px',
        }}
      >
        <Stack
          direction={md ? 'column' : 'row'}
          sx={{
            zIndex: 1,
            position: 'fixed',
            pb: !md ? 0 : '65px',
            height: !md ? 'auto' : '100%',
            width: !md ? '100%' : '220px',
          }}
        >
          <Nav />

          <AboutModerator />
        </Stack>

        <Box width='100%' m={md ? '-16px 40px -16px 236px' : '100px 0 0 0'}>
          {children}
        </Box>
      </Stack>
    );
  })
);

export default Sidebar;
