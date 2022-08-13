import React from 'react';
import { inject, observer } from 'mobx-react';
import { Stack, Tooltip, IconButton } from '@mui/material';
import { DeveloperMode, Logout, Home } from '@mui/icons-material';
import { SectionsDataT } from 'utils/dataFormatting';
import NavButton from './NavButton';

type SidebarType = {
  rootStore?: any;
  authorizationSt?: any;
  userSt?: any;
};

const Sidebar: React.FC<SidebarType> = inject(
  'authorizationSt',
  'userSt'
)(
  observer(({ authorizationSt, userSt }) => {
    const {
      settings: { sections },
    }: { settings: { sections: SectionsDataT } } = userSt;

    const logoutHandler = () => authorizationSt.logout();

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
            <NavButton href='/QA' title='QA Engine' icon={<DeveloperMode />} />
          )}
        </Stack>
        <Tooltip placement='right' title='Выйти'>
          <IconButton onClick={logoutHandler} sx={stylesLogoutBtn}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  })
);

export default Sidebar;
