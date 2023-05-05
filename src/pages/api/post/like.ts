import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

const handleLike = async (postId: string, userId: string) => {
  const like = await prisma.like.findUnique({
    where: {
      postId_userId: { postId, userId },
    },
  });
  if (like) {
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
    return null;
  } else {
    const newLike = await prisma.like.create({
      data: {
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
    return newLike;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(500)
      .json({ message: "Usuário precisa estar autenticado" });
  }
  const { postId } = req.body;
  const userId = session.user?.id;
  const like = await handleLike(postId, userId);

  if (!like) {
    return res.status(200).json({ message: "Curtida removida com sucesso" });
  }
  return res
    .status(200)
    .json({ message: "Curtida adicionada com sucesso", like });
}
