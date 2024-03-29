import React from 'react';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import { inject, observer } from 'mobx-react';
import RootStore from 'store/rootStore';
import UserSt from 'store/user/userSt';

type ClickBoardInputT = {
  label: string;
  toClipboard: string;
  toClipboardLabel: string;
  userSt: UserSt;
  rootStore: RootStore;
};

const ClipboardInput = inject(
  'rootStore',
  'userSt'
)(
  observer((props) => {
    const {
      label,
      rootStore,
      toClipboard,
      toClipboardLabel,
      userSt: {
        settings: { mode },
      },
    }: ClickBoardInputT = props;

    const copyToClipboard = (toClipboard: string) => {
      if (toClipboard) {
        rootStore.showSnackbar('Скопировано в буфер обмена.', 'success');
        navigator.clipboard.writeText(toClipboard);
      } else {
        rootStore.showSnackbar('Отсутствует значение, обратитесь к администратору.', 'error');
      }
    };

    return (
      <>
        <Box component='span' mb='8px' color='grayscale.40' fontSize={16}>
          {label}
        </Box>

        <Stack
          p='17px'
          mb='24px'
          fontSize={16}
          direction='row'
          borderRadius='8px'
          position='relative'
          alignItems='center'
          justifyContent='space-between'
          bgcolor={mode === 'light' ? '#F5F5F5' : '#202020'}
          color={mode === 'light' ? 'grayscale.100' : 'grayscale.0'}
          sx={{ transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out,' }}
        >
          <Box>{toClipboardLabel}</Box>

          <Box sx={{ cursor: 'pointer' }} onClick={() => copyToClipboard(toClipboard)}>
            <Image
              width={24}
              height={24}
              quality={100}
              src='/icons/copy.svg'
              alt='скопировать текст'
            />
          </Box>
        </Stack>
      </>
    );
  })
);

export default ClipboardInput;
