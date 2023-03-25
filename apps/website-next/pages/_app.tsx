import { AppProps } from 'next/app';
import Head from 'next/head';
import { FooterComponent } from '../components/footer-component';
import { HeaderComponent } from '../components/header-component';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Spicy Home</title>
      </Head>
      <main className="app">
        <HeaderComponent />
        <Component {...pageProps} />
        <FooterComponent />
      </main>
    </>
  );
}

export default CustomApp;
