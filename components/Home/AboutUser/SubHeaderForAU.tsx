import React from 'react';
import { Typography } from '@mui/material';

const SubHeaderForAU: React.FC<{ text: string }> = ({ text }) => (
  <Typography component='span' variant='subtitle1' fontWeight='400' color='white'>
    {text}
  </Typography>
);

export default SubHeaderForAU;
