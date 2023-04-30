// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (!session) {
    return res
      .status(500)
      .send({
        message: "Você precisa estar cadastrado para ver esse conteúdo",
      });
  }
  res.status(200).json({ message: "John Doe" });
}
