import { AppProps } from 'next/app';
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
import NProgress from 'nprogress'; // nprogress module
import Loading from 'kit/Loading/Loading';
import { SnackbarProvider } from 'notistack';
import createEmotionCache from '../store/createEmotionCache';
import { useStore } from '../store/rootStore';
import { getDesignTokens } from '../theme';
import 'nprogress/nprogress.css';

config.autoAddCss = false;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
// Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type InnerAppT = {
  userSt: UserSt;
  emotionCache: EmotionCache;
  authorizationSt: AuthorizationSt;
};

const InnerApp = inject(
  'authorizationSt',
  'userSt'
)(
  observer((props) => {
    const {
      Component,
      pageProps,
      authorizationSt: { getSettings },
      userSt: {
        settings: { auth },
      },
      emotionCache = clientSideEmotionCache,
    }: AppProps & InnerAppT = props;

    const C = Component as FunctionComponent;

    const rootStore = useStore(pageProps.initialState);
    const theme = React.useMemo(
      () =>
        responsiveFontSizes(
          createTheme(
            getDesignTokens('dark' || rootStore.userSt.settings.darkTheme) as ThemeOptions
          )
        ), // Только тёмная тема
      [rootStore.userSt.settings.darkTheme]
    );

    useEffect(() => {
      if (!auth) getSettings();
    }, [auth]);

    return (
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=0.9, maximum-scale=0.9'
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loading />
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            maxSnack={3}
            preventDuplicate
            dense
          >
            <C {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    );
  })
);

const App: FC<AppProps> = (props) => {
  const { pageProps } = props;
  const rootStore = useStore(pageProps.initialState);

  return (
    <Provider
      rootStore={rootStore}
      uiSt={rootStore.uiSt}
      userSt={rootStore.userSt}
      homeSt={rootStore.homeSt}
      manageSt={rootStore.manageSt}
      authorizationSt={rootStore.authorizationSt}
    >
      <InnerApp {...props} />
    </Provider>
  );
};

export default App;
