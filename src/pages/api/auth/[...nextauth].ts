import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

interface PasswordProps {
  candidatePassword: string;
  hash: string;
  salt: string;
}

const generateUsernameFromName = (name: string): string => {
  // Convert the name to lowercase and remove any special characters
  const sanitized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Split the name into first and last name
  const parts = sanitized.split(" ");
  // Combine the first two parts of the name (or just the first part if only one name is provided)
  const username = parts[0] + (parts.length > 1 ? parts[1] : "");
  // Add a random number at the end to ensure uniqueness
  const randomNumber = Math.floor(Math.random() * 1000);
  const generatedUsername = `${username}${randomNumber}`;
  return generatedUsername;
};

const checkIfUserAlreadyExists = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const verifyPassword = ({ candidatePassword, hash, salt }: PasswordProps) => {
  const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512")
    .toString("hex");

  const result = candidateHash === hash;

  return result;
};


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
        // Check if hast credentials
        if (!credentials) {
          throw new Error("Credenciais não fornecidas");
        }
        // Check if user is already existed
        const user = await checkIfUserAlreadyExists(credentials.email);
        if (!user) {
          throw new Error("Nenhum usuário registrado com esse email");
        }
        /**
         * If user exists then check if the password is correct
         * By hashing the current typed password and comparing it
         * with the hash stored in the database.
         * If its correct then return the user, else return error message
         */
        const correctPassword = verifyPassword({
          candidatePassword: credentials.password,
          hash: user.password!,
          salt: user.salt!,
        });

        if (!correctPassword) {
          throw new Error("Senha incorreta");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        token.name = profile?.name;
        token.username = generateUsernameFromName(profile?.name!);
        console.log(token.username);
      }

      // Return the token object
      console.log(token);
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
