import React from 'react';
import { useRouter } from 'next/router';
import { Paper, Stack, Typography } from '@mui/material';
import GreenButton from '../GreenButton';

const NotEnoughRights = () => {
  const router = useRouter();
  const onClickHandler = () => router.push('/home');

  return (
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
        backgroundColor: 'background.main',
      }}
    >
      <Stack direction='column' justifyContent='center' alignItems='center'>
        <Typography variant='h6' fontWeight='400' mb={5}>
          У вас недостаточно разрешений, обратитесь к администратору.
        </Typography>

        <GreenButton onClick={onClickHandler}>На главную</GreenButton>
      </Stack>
    </Paper>
  );
};

export default NotEnoughRights;
