import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//import axiosInstance from "../../../utils/api";

export default NextAuth({
  providers: [
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
            
            // Attach user details and token
            //localStorage.setItem("token", data.token);
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
      }
      //console.log(user.token);
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id, name: token.name, email: token.email,token:token.token };
     // localStorage.setItem("token", result.data.token);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
