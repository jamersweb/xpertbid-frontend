import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            "https://violet-meerkat-830212.hostingersite.com/public/api/login",
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const data = await res.json();

          if (res.ok && data.token) {
            // data.token is your Laravel token (e.g. Sanctum personal access token)
            // data.user is the user object from your Laravel API
            return { ...data.user, token: data.token };
          }

          throw new Error(data.message || "Login failed");
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],

  callbacks: {
    /**
     * signIn callback is triggered for ALL providers:
     * - For Google/Apple, we do an extra call to your Laravel /api/oauth-login endpoint
     *   to store the user in the DB & retrieve a Sanctum token (if you want).
     * - For Credentials, we already get the token in authorize(), so no extra call needed.
     */
    async signIn({ user, account }) {
      try {
        // If sign-in is via Google or Apple, call your custom Laravel endpoint to store user & get token
        if (account?.provider === "google" || account?.provider === "apple") {
          const oauthResponse = await fetch(
            "https://violet-meerkat-830212.hostingersite.com/public/api/oauth-login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: account.provider,  // e.g. "google" or "apple"
                provider_id: user.id,        // e.g. Google user ID
                name: user.name,
                email: user.email,
                avatar: user.image || 'rage',  // If needed
              }),
            }
          );
          //console.log(oauthResponse);
          if (!oauthResponse.ok) {
            console.error("Laravel OAuth login failed");
           // return false; // Abort sign-in
          }

          const data = await oauthResponse.json();
          // Example response structure: { user: {...}, token: "SANCTUM_TOKEN" }
          //console.log(data);
          //console.log(data.user);
          // Attach the token to the user object, so we can store it in the JWT callback
          user.avatar = data.user.profile_pic || null;
          user.token = data.token || null;
        }

        return true; // Continue sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Stop sign in
      }
    },

    /**
     * jwt callback: runs whenever a token is created/updated.
     * We store tokens from BOTH:
     *  - Credentials-based sign-in (user.token from authorize())
     *  - OAuth-based sign-in (user.token from signIn callback)
     */
    async jwt({ token, user, account }) {
      // If user is present, we are in the middle of sign-in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatar = user.avatar;
        token.token = user.token || null; // Laravel token
      }

      // For OAuth providers, store the provider's access_token/refresh_token
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }

      return token;
    },

    /**
     * session callback: whenever getSession() or useSession() is called on the client,
     * we attach the relevant tokens to session.user so the front-end can use them.
     */
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        token: token.token,           // Laravel token if any
        accessToken: token.accessToken, // Google/Apple access token
        refreshToken: token.refreshToken, // Google/Apple refresh token
        provider: token.provider, 
        avatar: token.avatar, 
        // "google", "apple", or undefined
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});