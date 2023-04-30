import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { api } from "@/lib/axios";
interface PasswordProps {
  candidatePassword: string;
  hash: string;
  salt: string;
}
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const checkIfUserAlreadyExists = async (email: string) => {
          return await prisma.user.findUnique({
            where: {
              email,
            },
          });
        };
        // Check if user already exists
        const isUser = await checkIfUserAlreadyExists(
          credentials?.email as string
        );
        if (!isUser) {
          throw new Error("Nenhum usuário registrado com esse email");
        }
        // Check Password
        const verifyPassword = ({
          candidatePassword,
          hash,
          salt,
        }: PasswordProps) => {
          const candidateHash = crypto
            .pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512")
            .toString("hex");

          const result = candidateHash === hash;

          return result;
        };
        const correctPassword = verifyPassword({
          candidatePassword: credentials?.password as string,
          hash: isUser.password as string,
          salt: isUser.salt as string,
        });

        if (!correctPassword || isUser.email !== credentials?.email) {
          throw new Error("Senha incorreta");
        }
        return isUser;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
