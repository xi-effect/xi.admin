import React from 'react';
import Router from 'next/router';
import { Paper, Stack, Typography } from '@mui/material';
import ButtonC from '../common/ButtonC';

const NotEnoughRights = () => (
  <Paper
    elevation={3}
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      zIndex: '100',
      margin: '10px',
      padding: '30px',
      textAlign: 'center',
      transform: 'translate(-50%,-50%)',
      backgroundColor: 'primary.pale',
    }}
  >
    <Stack direction='column' justifyContent='center' alignItems='center'>
      <Typography variant='h5' fontWeight='400' mb={5}>
        У вас недостаточно разрешений, обратитесь к администратору.
      </Typography>

      <ButtonC onClick={() => Router.push('/home')}>На главную</ButtonC>
    </Stack>
  </Paper>
);

export default NotEnoughRights;
