import React from 'react';
import { Stack } from '@mui/material';
import Documentation from 'components/Home/Documentation';
import Site from 'components/Home/Site';
import GitHub from 'components/Home/GitHub';
import AdminPanel from 'components/Home/AdminPanel';
import Design from 'components/Home/Design';
import Auxiliary from 'components/Home/Auxiliary';
import BackEndDoc from 'components/Home/BackEndDoc';
import Layout from 'kit/Layout/Layout';

const Home = () => (
  <Layout title='Главная'>
    <Stack justifyContent='center' direction='row' flexWrap='wrap'>
      <Documentation />

      <Site />

      <GitHub />

      <Stack m='16px' flex='1 1 100%' maxWidth='448px'>
        <AdminPanel />

        <BackEndDoc />
      </Stack>

      <Auxiliary />

      <Design />
    </Stack>
  </Layout>
);

export default Home;
