import React from 'react';
import Head from 'next/head';
import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import Sidebar from 'components/sidebar/Sidebar';
import { withAccessCheck } from 'utils/withAccessCheck';
import ToggleThemeButton from '../common/ToggleThemeButton';

export type LayoutT = {
  title: string;
};

const Layout: React.FC<LayoutT> = ({ title, children }) => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <Head>
        <title>{title} | xi.admin</title>
        <meta name='robots' content='noindex' />
      </Head>

      <Box m='0 auto' maxWidth='1276px' p={md ? '64px 20px 120px 20px ' : '0'}>
        {md && <ToggleThemeButton sx={{ mb: '16px' }} />}

        <Stack direction='row' alignItems='flex-start' justifyContent='flex-start'>
          <Sidebar />

          <Box width='100%' m={md ? '0 56px 0 252px' : '80px 20px 20px 20px'}>
            {children}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default withAccessCheck<LayoutT>(Layout);
