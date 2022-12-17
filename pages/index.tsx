import { Stack } from '@mui/material';
import React from 'react';
import { inject, observer } from 'mobx-react';
import SingInForm from 'components/Signin/SingInForm';
import Layout from 'kit/Layout/Layout';

const SignIn = inject()(
  observer(() => (
    <Layout title='Вход'>
      <Stack
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'background.main',
        }}
      >
        <SingInForm />
      </Stack>
    </Layout>
  ))
);

export default SignIn;
