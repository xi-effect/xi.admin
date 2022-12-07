import React from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import SingInForm from 'components/Signin/SingInForm';

const SignIn = inject()(
  observer(() => (
    <>
      <Head>
        <title>Вход | xi.admin</title>
        <meta name='robots' content='noindex' />
      </Head>

      <Stack
        width='100%'
        height='100vh'
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <SingInForm />
      </Stack>
    </>
  ))
);
export default SignIn;
