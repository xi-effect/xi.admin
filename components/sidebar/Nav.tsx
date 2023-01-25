import React from 'react';
import { inject, observer } from 'mobx-react';
import { Stack, Box } from '@mui/material';
import AuthorizationSt from 'store/user/authorizationSt';
import UserSt from 'store/user/userSt';
import NavButton from 'components/sidebar/NavButton';

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
  transition: 'background 0.3s ease, color 0.3s ease',
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
        settings: { sections, mode },
      },
    }: SidebarT = props;

    return (
      <Stack component='nav'>
        <NavButton visibility href='/home'>
          Главная
        </NavButton>

        <NavButton href='/qa' visibility={!!sections['quality assurance']?.emailing}>
          Тестирование
        </NavButton>

        <NavButton href='/manage-mode/moderators' visibility={!!sections.super?.['manage mods']}>
          Модераторы
        </NavButton>

        <NavButton
          href='/manage-mode/files'
          visibility={!!sections['content management']?.['manage files']}
        >
          Файлы
        </NavButton>

        <Box
          onClick={() => logoutUser()}
          sx={{
            ...navLinkS,
            mt: '22px',
            color: mode === 'light' ? 'grayscale.100' : 'grayscale.0',
          }}
        >
          Выйти
        </Box>
      </Stack>
    );
  })
);

export default Nav;
