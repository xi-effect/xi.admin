import React from 'react';
import CardLayout from 'kit/layout/CardLayout';
import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import LinkC from 'kit/common/LinkC';

const BackEndDoc = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const LinkCS = {
    m: '4px',
    flex: sm ? '1 1 46%' : '1 1 100%',
  };

  return (
    <CardLayout sx={{ m: '0' }}>
      <Box component='span' mb='32px' fontSize={24} fontWeight={500}>
        Документация Back-End
      </Box>

      <Stack m='-8px' direction='row' flexWrap='wrap'>
        <LinkC sx={LinkCS} href='https://xieffect.ru:5000/doc/'>
          REST API
        </LinkC>

        <LinkC sx={LinkCS} href='https://xieffect.ru:5000/sio-doc/'>
          SocketIO
        </LinkC>
      </Stack>
    </CardLayout>
  );
};

export default BackEndDoc;
