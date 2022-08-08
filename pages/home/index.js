import Head from 'next/head';
import React from 'react';
import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Navigation from 'kit/Navigation/Navigation';

const Home = inject()(
  observer(() => (
    <>
      <Head>
        <title>Ξffect | Главная</title>
        <meta name='robots' content='noindex' />
      </Head>
      <Navigation>
        <Stack
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={0}
          sx={{
            width: '100%',
            m: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          Главная Админки
        </Stack>
      </Navigation>
    </>
  ))
);

export default Home;
