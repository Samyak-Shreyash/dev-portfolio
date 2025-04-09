// _app.tsx

import Script from 'next/script';

import { AppProps } from 'next/app';
import { useEffect } from 'react';
import * as gtag from '@/lib/gtag'; //
import { useRouter } from 'next/router';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
      if (!GA_ID) return;
  
      const handleRouteChange = (url: string) => {
        gtag.pageview(url);
      };
  
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router.events]);
    
  return ( GA_ID &&
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', ${new Date()});
          gtag('config', ${GA_ID});
        `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;