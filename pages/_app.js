// pages/_app.js
//import '@/styles/globals.css' // If you have a global CSS
import Head from 'next/head'
//
//import { SessionProvider } from "next-auth/react";
import { SessionProvider, useSession } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ExpertBid</title>
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
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  return <>{children}</>;
};