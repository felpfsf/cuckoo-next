import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/passwordCrypto";

const UpdateUserDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  passwordConfirmation: z.string().optional(),
  bio: z.string().optional(),
});

type UpdateUserData = z.infer<typeof UpdateUserDataSchema>;

interface ApiResponse {
  message: string;
  updatedUser?: UpdateUserData;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(500).send({
        message: "Você precisa estar cadastrado para ver esse conteúdo",
      });
    }

    const currentUserId = session.user.id;
    const data = UpdateUserDataSchema.parse(req.body);
    await updateTransaction(data, currentUserId);

    return res.status(201).json({ message: "Dados alterados com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const updateTransaction = async (data: any, currentUserId: string) => {
  if (data.password) {
    const { password, passwordConfirmation, ...rest } = data;
    const { hash, salt } = hashPassword(password);

    return await prisma.user.update({
      where: { id: currentUserId },
      data: {
        ...rest,
        password: hash,
        salt,
      },
    });
  } else {
    const { password, passwordConfirmation, ...rest } = data;
    return await prisma.user.update({
      where: { id: currentUserId },
      data: { ...rest },
    });
  }
};
