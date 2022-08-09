import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Tooltip, IconButton } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';

type SidebarType = {
  rootStore?: any;
  authorizationSt?: any;
};

const menu = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: 'Главная',
    href: '/home',
  },
  {
    id: 1,
    icon: <EmailIcon />,
    label: 'Почта',
    href: '/email',
  },
];

const Sidebar: React.FC<SidebarType> = inject('authorizationSt')(
  observer(({ authorizationSt }) => {
    const router = useRouter();

    return (
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
        spacing={2}
        sx={{
          position: 'relative',
          pt: 2,
          width: 80,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'grey.800',
          boxShadow: 12,
        }}
      >
        <Stack
          sx={{ width: 80 }}
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          {menu.map((item, index) => (
            <Tooltip key={index.toString()} placement='right' title={item.label}>
              <IconButton
                onClick={() => {
                  router.push(item.href);
                }}
                sx={{
                  bgcolor: router.pathname.includes(item.href) ? 'primary.main' : '',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: router.pathname.includes(item.href) ? 'primary.main' : '',
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
        <Tooltip placement='right' title='Выйти'>
          <IconButton
            onClick={() => {
              authorizationSt.logout();
            }}
            sx={{
              position: 'absolute',
              bottom: 16,
              bgcolor: 'error.dark',
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'error.main',
              },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  })
);

export default Sidebar;
