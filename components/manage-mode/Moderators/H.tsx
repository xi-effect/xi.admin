import React, { FC } from 'react';
import { Typography } from '@mui/material';

const H: FC<{ color?: string }> = ({ children, color }) => (
  <Typography variant='body1' fontWeight='400' color={color || '#5F85D8'}>
    {children}
  </Typography>
);

export default H;
