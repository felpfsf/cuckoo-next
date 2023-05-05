import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

const handleCreateComment = async (
  content: string,
  postId: string,
  userId: string
) => {
  return await prisma.comment.create({
    data: {
      content,
      author: { connect: { id: userId } },
      post: { connect: { id: postId } },
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send({
      message: "Usuário precisa estar autenticado",
    });
  }
  if (req.method === "POST") {
    if (!req.body)
      return res.status(405).json({ error: "Form data unavailable" });

    const { content, postId } = req.body;
    const userId = session.user.id;
    console.log(content, postId);

    try {
      const result = await handleCreateComment(content, postId, userId);
      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  } else {
    return res.status(500).json({
      message: "HTTP method not supported, only POST method is supported",
    });
  }
}
