import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

interface UserIdRequest {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id }: UserIdRequest = req.body;
    if (!id) {
      return res.status(400).json({ message: "Faltando user ID" });
    }
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(500).send({
        message: "Você precisa estar cadastrado para ver esse conteúdo",
      });
    }

    const sessionUserId = session?.user.id;
    const follow = await followTransaction(sessionUserId, id);

    return res.json({ message: "Seguindo usuário" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const followTransaction = async (sessionUserId: string, id: string) => {
  const follow = await prisma.$transaction(async (prisma) => {
    const follower = await prisma.user.findUnique({
      where: { id: sessionUserId },
    });
    const following = await prisma.user.findUnique({ where: { id } });
    if (!follower || !following) {
      throw new Error("Usário não encontrado");
    }
    const existingFollow = await prisma.follows.findFirst({
      where: {
        followerId: sessionUserId,
        followingId: id,
      },
    });
    if (existingFollow) {
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: sessionUserId,
            followingId: id,
          },
        },
      });
      return null;
    } else {
      const newFollow = await prisma.follows.create({
        data: {
          follower: { connect: { id: sessionUserId } },
          following: { connect: { id } },
        },
      });
      return newFollow;
    }
  });
  return follow;
};
