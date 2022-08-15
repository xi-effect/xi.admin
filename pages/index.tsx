import { Stack } from '@mui/material';
import React from 'react';
import { inject, observer } from 'mobx-react';
import Header from 'components/Signin/Header';
import SingInForm from 'components/Signin/SingInForm';
import Layout from 'kit/Layout/Layout';

const SignIn = inject()(
  observer(() => (
    <Layout title='Вход'>
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          backgroundColor: 'background.main',
        }}
      >
        <Header />
        <SingInForm />
      </Stack>
    </Layout>
  ))
);

export default SignIn;
