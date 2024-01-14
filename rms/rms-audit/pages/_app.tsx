import { NextUIProvider } from '@nextui-org/react';
import '../styles/global.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RMS Audit Report</title>
      </Head>
      <main className="h-screen w-screen flex items-center justify-center">
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </main>
    </>
  );
}

export default CustomApp;
