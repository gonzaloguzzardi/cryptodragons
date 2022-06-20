import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import '../styles/globals.scss';
interface MyAppProps extends AppProps {
  Component: any;
  emotionCache?: EmotionCache;
  pageProps: any;
}

const clientSideEmotionCache = createEmotionCache();

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <StylesProvider generateClassName={generateClassName}>
      <CacheProvider value={emotionCache}>
        <CssBaseline />
        <Component {...pageProps} />
      </CacheProvider>
    </StylesProvider>
  );
};

export default MyApp;
