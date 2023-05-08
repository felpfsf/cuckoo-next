import MainLayout from "@/components/MainLayout";
import { prisma } from "@/lib/prisma";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

interface UserProps {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  password: string;
  salt: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
}

interface Post {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

interface UserPageProps {
  user: UserProps;
}

export default function UserPage({ user }: UserPageProps) {
  return (
    <MainLayout pageTitle={`Perfil de Teste | Cuckoo`}>
      <div className='p-4'>
        <h1>{user.name}</h1>
      </div>
    </MainLayout>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const users = await prisma.user.findMany();
//   const paths = users.map((user) => ({ params: { userId: user.id } }));
//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userId = params?.id as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { posts: true },
  });
  console.log(user);
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
