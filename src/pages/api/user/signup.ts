import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

interface UserData {
  name: string;
  password: string;
  confirm_password: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Form data unavailable" });

    const body = req.body;
    console.log("Aqui é o servidor", body);

    // Checando se o usuário existe
    try {
      const temp = await checkIfUserAlreadyExists(body.email);
      if (temp) return res.status(500).end({ message: "User already exists" });

      const user = await handleCreateUser(body);
      // Enviando a resposta
      return res
        .status(201)
        .json({ message: "User created successfully", user });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json({
      message: "HTTP method not supported, only POST method is supported",
    });
  }
}

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

const handleCreateUser = async (body: UserData) => {
  const { confirm_password, password, ...rest } = body;
  const { hash, salt } = hashPassword(password);
  const data = { password: hash, salt, ...rest };
  const user = await prisma.user.create({
    data,
  });
  return user;
};
