import type { AppProps } from 'next/app';
import React, { FC, useEffect, FunctionComponent } from 'react';
import Head from 'next/head';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles';
import Router from 'next/router';
import { Provider, observer, inject } from 'mobx-react';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import 'moment/locale/ru';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';
import AuthorizationSt from 'store/user/authorizationSt';
import UserSt from 'store/user/userSt';
import NProgress from 'nprogress';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { getScheme } from '@xieffect/base.theme.scheme';
import { Loading } from '@xieffect/base.components.loading';
import createEmotionCache from '../utils/createEmotionCache';
import RootStore, { useStore } from '../store/rootStore';
import 'nprogress/nprogress.css';
import UISt from '../store/ui/uiSt';

type InnerAppT = {
  userSt: UserSt;
  rootStore: RootStore;
  authorizationSt: AuthorizationSt;
  uiSt: UISt;
};

config.autoAddCss = false;

const clientSideEmotionCache = createEmotionCache();

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const InnerApp = inject(
  'authorizationSt',
  'userSt',
  'rootStore',
  'uiSt'
)(
  observer((props) => {
    const {
      Component,
      pageProps,
      userSt: {
        settings: { auth, mode },
      },
      uiSt: {
        settings: { loading },
      },
      authorizationSt: { getSettings },
      rootStore: {
        globalOptions: {
          snackbar: { show, message, variant },
        },
      },
    }: AppProps & InnerAppT = props;

    const C = Component as FunctionComponent;

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      if (!auth) getSettings();
    }, [auth]);

    useEffect(() => {
      if (show !== null) enqueueSnackbar(message, { variant, autoHideDuration: 1000 });
    }, [show]);

    useEffect(() => {
      document.body.style.transition = 'background 0.2s ease-in-out';
      document.body.style.backgroundColor = mode === 'light' ? '#ECEFFF' : '#202020';
    }, [mode]);

    return (
      <>
        <Loading loading={!!loading} />

        <C {...pageProps} />
      </>
    );
  })
);

const App: FC<AppProps & { emotionCache: EmotionCache }> = (props) => {
  const { emotionCache = clientSideEmotionCache } = props;

  const rootStore = useStore(null);

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(createTheme(getScheme(rootStore.userSt.settings.mode) as ThemeOptions)),
    [rootStore.userSt.settings.mode]
  );

  return (
    <Provider
      rootStore={rootStore}
      uiSt={rootStore.uiSt}
      userSt={rootStore.userSt}
      homeSt={rootStore.homeSt}
      manageSt={rootStore.manageSt}
      authorizationSt={rootStore.authorizationSt}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=0.9, maximum-scale=0.9'
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            maxSnack={3}
            preventDuplicate
            dense
          >
            <InnerApp {...props} />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
};

export default App;
