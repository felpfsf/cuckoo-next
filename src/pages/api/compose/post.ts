import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

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
  const { content } = req.body;
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (!session) {
    return res.status(500);
  }
  const userEmail = session.user?.email!;

  const result = await handleCreatePost(content, userEmail);

  return res.status(201).json(result);
}
