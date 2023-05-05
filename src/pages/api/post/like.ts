import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

const handleLike = async (postId: string, userId: string) => {
  const like = await prisma.like.create({
    data: {
      post: {
        connect: { id: postId },
      },
      user: {
        connect: { id: userId },
      },
    },
  });
  console.log(like)
};

type Data={
  postId:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(500)
      .json({ message: "Usuário precisa estar autenticado" });
  }
  const userId = session.user.id;
  console.log(session.user.id);
  const like = handleLike(postId, userId)
  // console.log(like);
}
