import React from 'react';
import CardLayout from 'kit/layout/CardLayout';
import { Box } from '@mui/material';
import LinkC from 'kit/common/LinkC';
import ClipboardInput from 'kit/common/ClipboardInput';

const VARIABLE_NAME: string = 'NEXT_PUBLIC_PASS_READER';

const Documentation = () => (
  <CardLayout>
    <Box component='span' mb='24px' fontSize={24} fontWeight={500}>
      Документация
    </Box>

    <ClipboardInput label='Логин' toClipboard='reader' toClipboardLabel='reader' />

    <ClipboardInput
      label='Пароль'
      toClipboardLabel='****************************'
      toClipboard={process.env[VARIABLE_NAME]}
    />

    <LinkC href='https://docs.xieffect.ru/'>Перейти</LinkC>
  </CardLayout>
);

export default Documentation;
