import React from 'react';
import CardLayout from 'kit/layout/CardLayout';
import { Box } from '@mui/material';
import LinkC from 'kit/common/LinkC';
import ClipboardInput from 'kit/common/ClipboardInput';

const Documentation = () => (
  <CardLayout>
    <Box component='span' mb='24px' fontSize={24} fontWeight={500}>
      Документация
    </Box>

    <ClipboardInput label='Логин' toClipboard='reader' toClipboardLabel='reader' />

    <ClipboardInput
      label='Пароль'
      toClipboardLabel='****************************'
      toClipboard={process.env.NEXT_PUBLIC_PASS_READER}
    />

    <LinkC href='https://docs.xieffect.ru/'>Перейти</LinkC>
  </CardLayout>
);

export default Documentation;
