/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Button, Box } from '@mui/material';
import { useSessionStorage, useBeforeUnload } from 'react-use';
import dynamic from 'next/dynamic';
import { useSnackbar } from 'notistack';
import { SectionsDataT } from 'utils/dataFormatting';
import NotEnoughRights from '../Layout/NotEnoughRights';

const Sidebar = dynamic(() => import('./Sidebar/Sidebar'), { ssr: false });

type Props = {
  rootStore?: any;
  userSt?: any;
  uiSt?: any;
  children: React.ReactNode;
};

const Navigation: React.FC<Props> = inject(
  'rootStore',
  'userSt',
  'uiSt',
)(
  observer(({ rootStore, userSt, uiSt, children }) => {
    const router = useRouter();

    const {
      settings: { sections },
    }: { settings: { sections: SectionsDataT } } = userSt;

    const [prevPathname, setPrevPathname] = useSessionStorage('prevPathname');
    const [hoverLeftName, setHoverLeftName] = React.useState('');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('dl'));

    React.useEffect(() => {
      setPrevPathname(router.pathname);
    }, [router.pathname]);

    const action = (key) => (
      <Button
        onClick={() => {
          closeSnackbar(key);
          router.reload();
        }}
      >
        Перезагрузить страницу
      </Button>
    );

    // React.useEffect(() => {
    //   if (!rootStore.socket?.connected) {
    //     rootStore.initSocket();
    //   };
    //   rootStore.socket.on("connect", () => {
    //     console.log("SIO connect", rootStore.socket.id);
    //   });
    //   rootStore.socket.on("disconnect", () => {
    //     console.log("SIO disconnect", rootStore.socket.id);
    //   });
    //   rootStore.socket.on("error", (error) => {
    //     enqueueSnackbar("Ошибка соединения", {
    //       persist: true,
    //       anchorOrigin: {
    //         vertical: 'bottom',
    //         horizontal: 'center',
    //       },
    //       TransitionComponent: Slide,
    //       action,
    //     });
    //   });
    // }, []);
    // @ts-ignore
    useBeforeUnload(() => {
      rootStore.socket.disconnect();
      rootStore.socket.off();
    });

    if (router.pathname === '/QA' && !sections['quality assurance']?.emailing) {
      return <NotEnoughRights />;
    }

    return (
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={2}
        sx={{
          zIndex: 0,
          backgroundColor: 'background.main',
          height: '100vh',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Sidebar />
        <Box
          sx={{
            zIndex: 0,
            backgroundColor: 'background.main',
            height: '100vh',
            overflow: 'hidden',
            width: `100%`,
          }}
        >
          {children}
        </Box>
      </Stack>
    );
  }),
);

export default Navigation;
