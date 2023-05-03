import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { RegisterInputProps, registerSchema } from "@/models/user.schemas";

interface HashedPassword {
  hash: string;
  salt: string;
}

const checkIfUserAlreadyExists = async (email: string, username: string) => {
  const userByEmail = await prisma.user.findUnique({ where: { email } });
  const userByUsername = await prisma.user.findUnique({ where: { username } });

  if (userByEmail) {
    return { field: "email", message: "Usuário já cadastrado com esse e-mail" };
  } else if (userByUsername) {
    return {
      field: "username",
      message: "Nome de usuário já cadastrado",
    };
  } else {
    return null;
  }
};

const hashPassword = (password: string): HashedPassword => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { hash, salt };
};

const handleCreateUser = async (body: RegisterInputProps) => {
  const { passwordConfirmation, password, ...rest } = body;
  const { hash, salt } = hashPassword(password);
  const data = { password: hash, salt, ...rest };
  const user = await prisma.user.create({
    data,
  });
  return user;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.body)
      return res.status(405).json({ error: "Form data unavailable" });

    // Checando se o usuário existe
    try {
      const body = registerSchema.parse(req.body);
      const userExists = await checkIfUserAlreadyExists(
        body.email,
        body.username
      );
      if (userExists?.field === "email") {
        return res
          .status(409)
          .json({ message: userExists.message });
      }
      if (userExists?.field === "username") {
        return res
          .status(409)
          .json({ message: userExists.message });
      }
      await handleCreateUser(body);
      // Enviando a resposta
      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Dados inválidos" });
    }
  } else {
    res.status(500).json({
      message: "HTTP method not supported, only POST method is supported",
    });
  }
}
