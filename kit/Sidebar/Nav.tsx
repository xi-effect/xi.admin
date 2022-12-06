import React from 'react';
import { inject, observer } from 'mobx-react';
import { Stack, Box, useMediaQuery, Theme } from '@mui/material';
import AuthorizationSt from 'store/user/authorizationSt';
import UserSt from 'store/user/userSt';
import NavButton from 'components/Sidebar/NavButton';

type SidebarT = {
  authorizationSt: AuthorizationSt;
  userSt: UserSt;
};

export const navLinkS = {
  mb: '5px',
  width: '100%',
  padding: '10px',
  fontWeight: 500,
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '8px',
  color: 'grayscale.100',
  transition: '0.3s background ease,0.3s color ease',
  '&:hover': {
    color: 'grayscale.0',
    bgcolor: 'primary.dark',
  },
};

const Nav = inject(
  'authorizationSt',
  'userSt'
)(
  observer((props) => {
    const {
      authorizationSt: { logoutUser },
      userSt: {
        settings: { sections },
      },
    }: SidebarT = props;

    const md = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    return (
      <Stack component='nav' direction={!md ? 'row' : 'column'}>
        <NavButton visibility href='/home'>
          Главная
        </NavButton>

        <NavButton href='/qa' visibility={!!sections['quality assurance']}>
          Тестирование
        </NavButton>

        <NavButton visibility={!!sections.super?.['manage mods']} href='/manage-mode'>
          Модераторы
        </NavButton>

        <NavButton
          visibility={!!sections['content management']?.['manage files']}
          href='/manage-mode'
        >
          Файлы
        </NavButton>

        <Box onClick={() => logoutUser()} sx={{ ...navLinkS, mt: md ? '24px' : 0 }}>
          Выйти
        </Box>
      </Stack>
    );
  })
);

export default Nav;
