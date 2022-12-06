import React from 'react';
import { Stack, SxProps, Theme } from '@mui/material';

type CardLayoutT = {
  sx?: SxProps<Theme>;
};

const CardLayout: React.FC<CardLayoutT> = ({ children, sx }) => (
  <Stack
    m='16px'
    p='24px'
    flex='1 1 100%'
    maxWidth='448px'
    borderRadius='8px'
    component='article'
    bgcolor='grayscale.0'
    sx={sx}
  >
    {children}
  </Stack>
);
export default CardLayout;
