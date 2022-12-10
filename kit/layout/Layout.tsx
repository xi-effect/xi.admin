import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import UserSt from 'store/user/userSt';
import Sidebar from 'components/sidebar/Sidebar';
import NotEnoughRights from './NotEnoughRights';
import ToggleThemeButton from '../common/ToggleThemeButton';

export type LayoutT = {
  title: string;
  children: ReactNode;
  userSt: UserSt;
};

const Layout = inject('userSt')(
  observer((props) => {
    const {
      title,
      children,
      userSt: {
        settings: { sections },
      },
    }: LayoutT = props;

    const router = useRouter();

    const md = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    if (
      (router.pathname === '/qa' && !sections['quality assurance']?.emailing) ||
      (router.pathname === '/manage-mode' && !sections.super?.['manage mods']) ||
      (router.pathname === '/manage-mode/files' &&
        !sections['content management']?.['manage files'])
    ) {
      return <NotEnoughRights />;
    }

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
  })
);

export default Layout;
