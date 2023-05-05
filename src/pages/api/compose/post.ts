import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

const handleCreatePost = async (content: string, userEmail: string) => {
  return await prisma.post.create({
    data: {
      content,
      author: { connect: { email: userEmail } },
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "Usuário precisa estar autenticado" });
  }

  const userEmail = session.user?.email!;
  const { content } = req.body;

  try {
    const result = await handleCreatePost(content, userEmail);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
