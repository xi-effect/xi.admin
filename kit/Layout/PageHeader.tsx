import React, { FC } from 'react';
import { Typography } from '@mui/material';

const PageHeader: FC<{ title: string }> = ({ title }) => (
  <Typography p={1} width='100%' variant='h5' textAlign='center'>
    {title}
  </Typography>
);

export default PageHeader;
