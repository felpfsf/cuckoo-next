import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import MainLayout from "@/components/MainLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import AvatarMockup from "../../assets/avatar_mockup_2.png";
import PostCard from "@/components/PostCard";

interface UserProps {
  id: string;
  name: string;
  image: string;
  posts: Post[];
}

interface Like {
  postId: string;
}

interface Comment {
  authorId: string;
  content: string;
  createdAt: string;
  id: string;
  postId: string;
}

interface Post {
  id: string;
  author: {
    name: string;
    id: string;
    image: string;
  };
  content: string;
  comments: Comment[];
  createdAt: string;
  likes: Like[];
}

interface UserPageProps {
  user: UserProps;
  likedPostIds: any[];
}

export default function UserPage({ user, likedPostIds }: UserPageProps) {
  const { data: session } = useSession();
  const isUserSession = session?.user.id === user.id;
  return (
    <MainLayout pageTitle={`Perfil de ${user.name} | Cuckoo`}>
      <div className='p-4'>
        <div className='mb-8'>
          <Link href={"/"} className='group flex items-center gap-4'>
            <BsArrowLeftShort size={32} />
            <span className='border-b-fuchsia-200 text-xl font-semibold group-hover:border-b'>
              Retornar
            </span>
          </Link>
        </div>
        <div className='flex justify-between'>
          <figure className='flex flex-col gap-3'>
            <div className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-fuchsia-900'>
              <Image
                src={user.image ? user.image : AvatarMockup}
                alt='Avatar do usuário'
                width={64}
                height={64}
                className='h-full w-full object-cover'
              />
            </div>
            <figcaption>
              <div id='user-name'>
                <p className='text-xl font-semibold'>{user.name}</p>
              </div>
            </figcaption>
          </figure>
          <div className=''>
            {isUserSession ? (
              <button className='rounded-3xl border px-6 py-2 transition-colors duration-200 ease-in-out hover:border-transparent hover:bg-fuchsia-500'>
                <strong>Editar Perfil</strong>
              </button>
            ) : (
              <button className='rounded-3xl border px-6 py-2 transition-colors duration-200 ease-in-out hover:border-transparent hover:bg-fuchsia-500'>
                <strong>Seguir</strong>
              </button>
            )}
          </div>
        </div>
        {/* Bio */}
        <div className='mt-4 flex flex-col gap-4'>
          <h2>Bioo</h2>
          <div className='flex gap-8'>
            <span>
              <strong>0</strong> Seguindo
            </span>
            <span>
              <strong>0</strong> Seguindores
            </span>
          </div>
        </div>
        {/* Posts */}
        <div className='mt-8 flex flex-col gap-4 border-t border-gray-800'>
          <h2 className='mt-4 text-xl font-semibold'>Posts</h2>
          {user.posts.map((post) => (
            <PostCard
              key={post.id}
              commentCount={post.comments.length}
              isLiked={likedPostIds.includes(post.id)}
              likeCount={post.likes.length}
              {...post}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const currentUserId = session?.user.id;
  const { id } = context.query;
  const userId = id as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: {
        select: {
          id: true,
          author: {
            select: {
              name: true,
              id: true,
              image: true,
            },
          },
          content: true,
          comments: true,
          createdAt: true,
          likes: true,
        },
        orderBy: { createdAt: "desc" },
      },
      followers: true,
      following: true,
    },
  });

  const likedPosts = await prisma.like.findMany({
    where: { userId: currentUserId },
    select: { postId: true },
  });
  const likedPostIds = likedPosts.map((like) => like.postId);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      likedPostIds,
    },
  };
};
