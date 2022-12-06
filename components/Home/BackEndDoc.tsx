import React from 'react';
import CardLayout from 'kit/Layout/CardLayout';
import { Box, Stack } from '@mui/material';
import LinkC from 'kit/common/LinkC';

const BackEndDoc = () => {
  const LinkCS = {
    m: '4px',
    flex: '1 1 46%',
  };

  return (
    <CardLayout sx={{ m: '0' }}>
      <Box component='span' mb='auto' fontSize={24} fontWeight={500}>
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
