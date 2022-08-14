/* eslint-disable import/no-relative-packages */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import Router from 'next/router';
import { Provider, observer, inject } from 'mobx-react';

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import 'moment/locale/ru';

import { SnackbarProvider } from 'notistack';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';

import NProgress from 'nprogress'; // nprogress module
import Loading from 'kit/Loading/Loading';
import createEmotionCache from '../store/createEmotionCache';
import { useStore } from '../store/rootStore';
import { getDesignTokens } from '../theme';
import 'nprogress/nprogress.css'; // styles of nprogress

config.autoAddCss = false;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
// Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const InnerApp = inject(
  'authorizationSt',
  'userSt'
)(
  observer((props) => {
    const {
      Component,
      pageProps,
      authorizationSt: { getSettings },
      userSt: { settings },
      emotionCache = clientSideEmotionCache,
    } = props;

    const rootStore = useStore(pageProps.initialState);
    const theme = React.useMemo(
      () =>
        responsiveFontSizes(
          createTheme(getDesignTokens('dark' || rootStore.userSt.settings.darkTheme))
        ), // Только тёмная тема
      [rootStore.userSt.settings.darkTheme]
    );

    useEffect(() => {
      if (!settings.auth) getSettings();
    }, [settings.auth]);

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
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    );
  })
);

const App = observer((props) => {
  const rootStore = useStore(props.pageProps.initialState);

  return (
    <Provider
      rootStore={rootStore}
      uiSt={rootStore.uiSt}
      userSt={rootStore.userSt}
      homeSt={rootStore.homeSt}
      authorizationSt={rootStore.authorizationSt}
    >
      <InnerApp {...props} />
    </Provider>
  );
});

export default App;

InnerApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
