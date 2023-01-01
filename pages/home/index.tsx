import React from 'react';
import { Stack } from '@mui/material';
import Documentation from 'components/home/Documentation';
import Site from 'components/home/Site';
import GitHub from 'components/home/GitHub';
import Design from 'components/home/Design';
import Auxiliary from 'components/home/Auxiliary';
import BackEndDoc from 'components/home/BackEndDoc';
import Layout from 'kit/layout/Layout';

const Home = () => (
  <Layout title='Главная'>
    <Stack m='-16px' justifyContent='center' direction='row' flexWrap='wrap'>
      <Documentation />

      <Site />

      <GitHub />

      <Stack m='16px' flex='1 1 100%' maxWidth='448px'>
        <BackEndDoc />

        <Auxiliary />
      </Stack>

      <Design />
    </Stack>
  </Layout>
);

export default Home;
