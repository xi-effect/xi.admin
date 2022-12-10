import React from 'react';
import CardLayout from 'kit/layout/CardLayout';
import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import LinkC from 'kit/common/LinkC';
import ClipboardInput from 'kit/common/ClipboardInput';

const Site = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <CardLayout>
      <Box component='span' mb='24px' fontSize={24} fontWeight={500}>
        Сайт
      </Box>

      <ClipboardInput label='Почта' toClipboard='test@test.test' />

      <ClipboardInput label='Пароль' toClipboard='123456' />

      <Stack direction={sm ? 'row' : 'column'} justifyContent='space-between'>
        <LinkC sx={{ flex: '0 0 49%', mb: sm ? 0 : '8px' }} href='https://xieffect.ru/'>
          Prod
        </LinkC>

        <LinkC sx={{ flex: '0 0 49%' }} href='https://xieffect.netlify.app/'>
          PreProd
        </LinkC>
      </Stack>
    </CardLayout>
  );
};

export default Site;
