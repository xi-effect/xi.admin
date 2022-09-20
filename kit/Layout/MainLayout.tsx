import React from 'react';
import { Stack } from '@mui/material';
import Layout, { LayoutT } from './Layout';
import Navigation from '../Navigation/Navigation';

const MainLayout: React.FC<LayoutT> = ({ title, children }) => (
  <Layout title={title}>
    <Navigation>
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          width: '100%',
          height: '100%',
          m: 0,
          p: 0,
          position: 'relative',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {children}
      </Stack>
    </Navigation>
  </Layout>
);

export default MainLayout;
