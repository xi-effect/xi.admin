import React from 'react';
import CardLayout from 'kit/Layout/CardLayout';
import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import LinkC from 'kit/common/LinkC';

const AdminPanel = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const LinkCS = {
    m: '4px',
    flex: sm ? '1 1 46%' : '1 1 100%',
  };

  return (
    <CardLayout sx={{ m: '0', mb: '32px' }}>
      <Box component='span' mb='32px' fontSize={24} fontWeight={500}>
        Админ-панель
      </Box>

      <Stack m='-8px' direction='row' flexWrap='wrap'>
        <LinkC sx={LinkCS} href=''>
          Админ-панель
        </LinkC>

        <LinkC sx={LinkCS} href=''>
          Core (Docker+NGINX)
        </LinkC>
      </Stack>
    </CardLayout>
  );
};

export default AdminPanel;
