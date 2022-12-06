import React from 'react';
import { Stack } from '@mui/material';
import MainLayout from 'kit/Layout/MainLayout';
import Documentation from 'components/Home/Documentation';
import Site from 'components/Home/Site';
import GitHub from 'components/Home/GitHub';
import AdminPanel from 'components/Home/AdminPanel';
import Design from 'components/Home/Design';
import Auxiliary from 'components/Home/Auxiliary';
import BackEndDoc from 'components/Home/BackEndDoc';

const Home = () => (
  <MainLayout title='Главная'>
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
  </MainLayout>
);

export default Home;
