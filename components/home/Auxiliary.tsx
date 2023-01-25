import React from 'react';
import CardLayout from 'kit/layout/CardLayout';
import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import LinkC from 'kit/common/LinkC';

const Auxiliary = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const LinkCS = {
    m: '4px',
    flex: sm ? '1 1 46%' : '1 1 100%',
  };

  return (
    <CardLayout sx={{ m: '0' }}>
      <Box component='span' mb={sm ? '24px' : 'auto'} fontSize={24} fontWeight={500}>
        Вспомогательное
      </Box>

      <Stack m='-8px' direction='row' flexWrap='wrap'>
        <LinkC sx={LinkCS} href='https://xi.kaiten.ru/'>
          Kaiten
        </LinkC>

        <LinkC sx={LinkCS} href='https://miro.com/app/board/o9J_lV8Vahk=/'>
          Miro
        </LinkC>
      </Stack>
    </CardLayout>
  );
};

export default Auxiliary;
