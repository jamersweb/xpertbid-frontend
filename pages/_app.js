// pages/_app.js
//import '@/styles/globals.css' // If you have a global CSS
import Head from 'next/head'
import Script from 'next/script'
import { SessionProvider } from "next-auth/react";
export default function App({ Component, pageProps }) {
  return (
    <>
      
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ExpertBid</title>
       </Head>

      {/* External scripts */}
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.datatables.net/2.1.8/js/dataTables.js" strategy="afterInteractive" />
      <Script src="https://cdn.datatables.net/2.1.8/js/dataTables.bootstrap5.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="https://code.jquery.com/jquery-3.7.1.js" strategy="afterInteractive" />
      {/* <Script src="/assets/js/loginQuery.js" strategy="afterInteractive" /> */}
      <Script src="/assets/js/script.js" strategy="afterInteractive" />

      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
