import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { FooterComponent } from '../components/footer-component';
import { HeaderComponent } from '../components/header-component';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Spicy Home</title>

        {/** og:headers */}
        <meta property="og:title" content="Spicy Home" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://spicyhomeksa.com" />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:description" content="Spicy Home" />

        {/** twitter:headers */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@spicyhomeksa" />
        <meta name="twitter:creator" content="@spicyhomeksa" />
        <meta name="twitter:title" content="Spicy Home" />
        <meta name="twitter:description" content="Spicy Home" />
        <meta name="twitter:image" content="/images/logo.svg" />

        {/** favicon */}
        <link rel="icon" href="/images/logo.svg" />

        {/** JSON+LD for Restaurant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Spicy Home',
              image: '/images/logo.svg',
              '@id': 'https://spicyhomeksa.com',
              url: 'https://spicyhomeksa.com',
              telephone: '+966112357926',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '4587 Hafsah Bint Omar, street',
                addressLocality: 'Riyadh',
                addressRegion: 'Riyadh',
                postalCode: '13211',
                addressCountry: 'SA',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 24.7136,
                longitude: 46.6753,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ],
                  opens: '12:00',
                  closes: '01:15',
                },
              ],
              // sameAs: [
              //   'https://www.facebook.com/spicyhomeksa',
              //   'https://www.instagram.com/spicyhomeksa',
              //   'https://twitter.com/spicyhomeksa',
              // ],
            }),
          }}
        />
      </Head>
      {/* Google tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-C5NNDZQYJV"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-C5NNDZQYJV');
      `}
      </Script>
      <main className="app">
        <HeaderComponent />
        <Component {...pageProps} />
        <FooterComponent />
      </main>
    </>
  );
}

export default CustomApp;
