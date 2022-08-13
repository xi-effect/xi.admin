/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */

/* eslint-disable jsx-a11y/anchor-is-valid */
import { Stack } from '@mui/material';

import React from 'react';
import { inject, observer } from 'mobx-react';

import { useSessionStorage } from 'react-use';

import Header from 'components/Signin/Header';
import Form from 'components/Signin/Form';
import Layout from 'kit/Layout/Layout';

const Signin = inject(
  'uiSt',
  'userSt',
)(
  observer((props) => {
    const { uiSt, userSt } = props;

    const [prevPathname, setPrevPathname] = useSessionStorage('prevPathname');

    return (
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
          <Form />
        </Stack>
      </Layout>
    );
  }),
);

export default Signin;
