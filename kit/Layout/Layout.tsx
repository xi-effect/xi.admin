import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';
import UserSt from 'store/user/userSt';
import NotEnoughRights from './NotEnoughRights';
import Sidebar from '../Sidebar/Sidebar';
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

        <Box m='0 auto' maxWidth='1257px' p={md ? '64px 10px 120px 10px ' : '0'}>
          {md && <ToggleThemeButton />}

          <Stack direction='row' alignItems='flex-start' justifyContent='flex-start'>
            <Sidebar />

            <Box width='100%' m={md ? '-16px 40px -16px 236px' : '70px 0 10px 0'}>
              {children}
            </Box>
          </Stack>
        </Box>
      </>
    );
  })
);

export default Layout;
