import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { RegisterInputProps, registerSchema } from "../../auth/register";

const checkIfUserAlreadyExists = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const hashPassword = (password: string) => {
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
      return res.status(404).json({ error: "Form data unavailable" });

    // Checando se o usuário existe
    try {
      const body = registerSchema.parse(req.body);
      // console.log("Aqui é o servidor", body);
      const temp = await checkIfUserAlreadyExists(body.email);
      if (temp) {
        return res
          .status(500)
          .send({ message: "Usuário já cadastrado com esse e-mail" });
      }

      const user = await handleCreateUser(body);
      // Enviando a resposta
      return res.status(201).send({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).send({
      message: "HTTP method not supported, only POST method is supported",
    });
  }
}
