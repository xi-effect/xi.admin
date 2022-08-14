import React from 'react';
import { Typography } from '@mui/material';

const HeaderForAU: React.FC<{ text: string }> = ({ text }) => (
  <Typography component='span' variant='h6' fontWeight='400' color='primary.main'>
    {text}
  </Typography>
);

export default HeaderForAU;
