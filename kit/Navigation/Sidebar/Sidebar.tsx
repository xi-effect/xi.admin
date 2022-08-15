import React from 'react';
import { inject, observer } from 'mobx-react';
import { Stack, Tooltip, IconButton } from '@mui/material';
import { DeveloperMode, Logout, Home } from '@mui/icons-material';
import AuthorizationSt from 'store/user/authorizationSt';
import UserSt from 'store/user/userSt';
import NavButton from './NavButton';

type SidebarT = {
  authorizationSt: AuthorizationSt;
  userSt: UserSt;
};

const Sidebar = inject('authorizationSt', 'userSt')(
  observer((props) => {
    const {
      authorizationSt,
      userSt: { settings: { sections } },
    }: SidebarT = props;

    const stylesLogoutBtn = {
      position: 'absolute',
      bottom: 16,
      bgcolor: 'error.dark',
      borderRadius: 2,
      '&:hover': {
        bgcolor: 'error.main',
      },
    };

    const stylesStack = {
      position: 'relative',
      pt: 2,
      width: 80,
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'grey.800',
      boxShadow: 12,
    };

    return (
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
        spacing={2}
        sx={stylesStack}
      >
        <Stack
          sx={{ width: 80 }}
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <NavButton href='/home' title='Главная' icon={<Home />} />

          {sections['quality assurance'] && (
            <NavButton href='/qa' title='QA Engine' icon={<DeveloperMode />} />
          )}
        </Stack>
        <Tooltip placement='right' title='Выйти'>
          <IconButton onClick={() => authorizationSt.logoutUser()} sx={stylesLogoutBtn}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  }),
);

export default Sidebar;
