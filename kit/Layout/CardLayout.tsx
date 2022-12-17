import React, { ReactNode } from 'react';
import { Stack, SxProps, Theme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import UserSt from 'store/user/userSt';

type CardLayoutT = {
  sx?: SxProps<Theme>;
  userSt: UserSt;
  children: ReactNode;
};

const CardLayout = inject('userSt')(
  observer((props) => {
    const {
      sx,
      children,
      userSt: {
        settings: { mode },
      },
    }: CardLayoutT = props;

    return (
      <Stack
        m='16px'
        p='24px'
        flex='1 1 100%'
        maxWidth='448px'
        borderRadius='8px'
        component='article'
        bgcolor={mode === 'light' ? 'grayscale.0' : 'grayscale.100'}
        color={mode === 'light' ? 'grayscale.100' : 'grayscale.0'}
        sx={{
          transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out,',
          ...sx,
        }}
      >
        {children}
      </Stack>
    );
  })
);
export default CardLayout;
