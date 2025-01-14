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
          const res = await fetch("https://violet-meerkat-830212.hostingersite.com/public/api/login", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const data = await res.json();

          if (res.ok && data.token) {
            return { ...data.user, token: data.token }; // Pass token to session
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
    async jwt({ token, user, account, profile }) {
      // Attach user data and tokens
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token || null; // Laravel token for credentials provider
      }

      if (account) {
        // Attach OAuth tokens from Google/Apple
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }

      return token;
    },
    async session({ session, token }) {
      // Add token and provider details to the session
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        token: token.token, // Laravel or OAuth token
        accessToken: token.accessToken, // Google/Apple access token
        refreshToken: token.refreshToken, // Google/Apple refresh token
        provider: token.provider, // OAuth provider
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});