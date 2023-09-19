import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { HungerstationProvider } from '../providers/hungerstation';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to hungerstation!</title>
      </Head>
      <main className="app">
        <HungerstationProvider>
          <Component {...pageProps} />
        </HungerstationProvider>
      </main>
    </>
  );
}

export default CustomApp;
