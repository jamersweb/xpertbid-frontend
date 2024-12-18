import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "../../../utils/api";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await axiosInstance.post("http://127.0.0.1:8000/api/login", {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.status === 200 && response.data.token && response.data.user) {
            return { id: response.data.user.id, name: response.data.user.name, email: response.data.user.email };
          }
          return null;
        } catch (error) {
          console.error("Error in credentials authorization:", error);
          return null;
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
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id, name: token.name, email: token.email };
      return session;
    },
  },
});
