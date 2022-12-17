import React, { ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import { Box, Stack, SxProps, Theme } from '@mui/material';
import UserSt from 'store/user/userSt';

type AboutModeratorT = {
  userSt: UserSt;
  id: string;
  username: string;
  permissions: string[];
  children: ReactNode;
  sx: SxProps<Theme>;
};

const AboutModerator = inject('userSt')(
  observer((props) => {
    const {
      id,
      sx,
      children,
      username,
      permissions,
      userSt: {
        settings: { mode },
      },
    }: AboutModeratorT = props;

    const permissionsJsx = permissions.map((s) => (
      <Box
        component='span'
        key={s}
        sx={{
          m: '4px',
          p: '4px 6px',
          borderRadius: '4px',
          height: children ? '36px' : '24px',
          fontSize: children ? '16px' : '12px',
          backgroundColor: mode === 'light' ? '#F5F5F5' : '#202020',
          transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out,',
        }}
      >
        {s}
      </Box>
    ));

    return (
      <Stack
        sx={{
          mt: 'auto',
          mb: '120px',
          width: '100%',
          padding: '16px',
          borderRadius: '8px',
          color: mode === 'light' ? 'grayscale.100' : 'grayscale.0',
          backgroundColor: mode === 'light' ? 'grayscale.0' : 'grayscale.100',
          transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out,',
          ...sx,
        }}
      >
        <Stack direction='row' sx={{ fontSize: 18, mb: '16px' }} justifyContent='space-between'>
          <Box fontWeight={500} component='span'>
            {username}
          </Box>

          <Box component='span' sx={{ color: 'grayscale.40' }}>
            {id}
          </Box>
        </Stack>

        <Stack flex='1 1 auto' direction='row' flexWrap='wrap'>
          {permissions.length ? permissionsJsx : <Box fontSize={15}>Отсутствуют разрешения</Box>}
        </Stack>

        {children}
      </Stack>
    );
  })
);

export default AboutModerator;
