import React from 'react';
import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Navigation from 'kit/Navigation/Navigation';
import Layout from 'kit/Layout/Layout';

const Home = inject()(
  observer(() => (
    <Layout title='Главная'>
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
    </Layout>
  ))
);

export default Home;
