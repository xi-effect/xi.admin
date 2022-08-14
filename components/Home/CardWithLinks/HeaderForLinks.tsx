import React from 'react';
import { Typography } from '@mui/material';

const HeaderForLinks: React.FC<{ text: string }> = ({ text }) => (
  <Typography component='span' variant='h6' fontWeight='400' color='primary.main'>
    {text}
  </Typography>
);

export default HeaderForLinks;
