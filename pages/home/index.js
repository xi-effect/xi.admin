import React from 'react';
import { Stack, Typography } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Navigation from 'kit/Navigation/Navigation';
import Layout from 'kit/Layout/Layout';
import AboutUser from 'components/Home/AboutUser/AboutUser';
import CardWithLinks from 'components/Home/CardWithLinks/CardWithLinks';

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
            height: '100%',
            m: 0,
            p: '10px 0',
            position: 'relative',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <Typography p={1} width='100%' variant='h5' textAlign='center'>
            Главная Админки
          </Typography>

          <Stack
            direction='row'
            alignItems='flex-start'
          >
            <CardWithLinks />
            <AboutUser />
          </Stack>

        </Stack>
      </Navigation>
    </Layout>
  )),
);

export default Home;
