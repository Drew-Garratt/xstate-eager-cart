import '../styles/globals.css'
import type { AppProps } from 'next/app';

// Workaround for https://github.com/zeit/next.js/issues/8592
export type MyAppProps = AppProps & {
  /** Will be defined only is there was an error */
  err?: Error;
};

const MyApp = (appProps: MyAppProps) => {
  const { Component, pageProps, err } = appProps;
  return <Component {...pageProps} err={err} />
}

export default MyApp
