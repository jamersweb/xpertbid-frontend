// pages/_app.js
//import '@/styles/globals.css' // If you have a global CSS
 import { useEffect } from 'react';

//import Script from 'next/script'
//import { SessionProvider } from "next-auth/react";




import Head from 'next/head'
import { SessionProvider, useSession } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    // Initialize OneSignal
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: '5501deaf-0664-4aa6-8bad-ac3f4c7532f5', // Replace with your app ID
        safari_web_id: 'YOUR_SAFARI_WEB_ID', // Optional for Safari support
      });

      // Prompt for notifications permission
      OneSignal.showNativePrompt();
    });
  }, []);
  return (
    <>
      
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>XpertBid</title>
       </Head>

      {/* External scripts */}
      
      <SessionProvider session={session}>
      <AuthWrapper>
          <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
      
    </>
  )
}
const AuthWrapper = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
   // return <div>Loading...</div>;
  }

  if (!session) {
   // return <div>Please log in to access this page.</div>;
  }

  return <>{children}</>;
};
