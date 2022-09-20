import React from 'react';
import { Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import AboutUser from 'components/Home/AboutUser/AboutUser';
import CardWithLinks from 'components/Home/CardWithLinks/CardWithLinks';
import PageHeader from 'kit/Layout/PageHeader';
import MainLayout from 'kit/Layout/MainLayout';

const Home = inject()(
  observer(() => (
    <MainLayout title='Главная'>
      <PageHeader title='Главная Админки' />

      <Stack direction='row' sx={{ width: '100%' }} alignItems='flex-start'>
        <CardWithLinks />
        <AboutUser />
      </Stack>
    </MainLayout>
  ))
);

export default Home;
