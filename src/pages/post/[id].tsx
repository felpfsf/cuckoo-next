import { useState } from "react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { api } from "@/lib/axios";
import { prisma } from "@/lib/prisma";
import { formatFullDate } from "@/utils/formatDate";
import MainLayout from "@/components/MainLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import AvatarMockup from "../../assets/avatar_mockup_2.png";
import { FaRegComment } from "react-icons/fa";

interface Like {
  postId: string;
}

interface Comment {
  author: { name: string; image: string };
  content: string;
  createdAt: string;
  id: string;
}

interface PostProps {
  author: { name: string; image: string };
  comments: Comment[];
  content: string;
  createdAt: string;
  id: string;
  likes: Like[];
}

interface Props {
  likedPostIds: string[];
  post: PostProps;
}

export default function Post({ likedPostIds, post }: Props) {
  const { data: session } = useSession();
  const isLiked = likedPostIds.includes(post.id);
  const [isLike, setIsLiked] = useState(isLiked);

  const handleLike = async (postId: string) => {
    try {
      setIsLiked((prev) => !prev);
      const response = await api.post("/api/post/like", { postId });
      const { message, like } = response.data;
      if (like) {
        console.log(message, like);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error(error);
      return "Ocorrreu um erro ao adicionar sua curtida";
    }
  };

  return (
    <MainLayout pageTitle={`Post de  | Cuckoo`}>
      <div className='p-4'>
        <div className='mb-8'>
          <Link href={"/"} className='group flex items-center gap-4'>
            <BsArrowLeftShort size={32} />
            <span className='border-b-fuchsia-200 text-xl font-semibold group-hover:border-b'>
              Retornar
            </span>
          </Link>
        </div>
        <div>
          <figure className='flex gap-3'>
            <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-fuchsia-900'>
              <Image
                src={post.author.image ? post.author.image : AvatarMockup}
                alt='Avatar do usuário'
                width={48}
                height={48}
                className='h-full w-full object-cover'
              />
            </div>
            <figcaption>
              <div id='user-name'>
                <p className='text-sm font-semibold'>{post.author.name}</p>
              </div>
            </figcaption>
          </figure>
          <div id='post-content' className='mt-4'>
            <p className='text-sm'>{post.content}</p>
          </div>
          <div className='mt-4'>
            <ul className='flex items-center gap-4'>
              <li>
                <p className='text-sm text-gray-600'>
                  {formatFullDate(post.createdAt)}
                </p>
              </li>
              <li>
                <p className='flex items-center gap-2 text-sm text-gray-600'>
                  <FaRegComment />
                  {post.comments.length}
                </p>
              </li>
              <li>
                <button
                  aria-label='Curtir'
                  className='flex items-center gap-2'
                  disabled={!session}
                  onClick={() => handleLike(post.id)}
                >
                  {isLike ? <AiFillHeart /> : <AiOutlineHeart />}
                  {post.likes.length}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8'>
          <strong>Comentários:</strong>
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className='mt-4 flex gap-3 border-t border-gray-800 pt-2'
            >
              <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-fuchsia-900'>
                <Image
                  src={
                    comment.author.image ? comment.author.image : AvatarMockup
                  }
                  alt='Avatar do usuário'
                  width={48}
                  height={48}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className='text-sm font-semibold'>{comment.author.name}</p>
                <p className='text-sm'>{comment.content}</p>
                <p className='text-sm text-gray-600'>
                  {formatFullDate(comment.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context?.query);
  const { id } = context.query;
  const session = await getSession(context);
  const currentUserId = session?.user.id;

  const post = await prisma.post.findUnique({
    where: { id: id as string },
    include: {
      author: {
        select: { name: true, image: true },
      },
      comments: {
        select: {
          content: true,
          author: {
            select: { name: true, image: true },
          },
          id: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
      likes: true,
    },
  });
  console.log(post);
  const likedPosts = currentUserId
    ? await prisma.like.findMany({
        where: {
          userId: currentUserId,
        },
        select: { postId: true },
      })
    : [];
  const likedPostIds = likedPosts.map((like) => like.postId);
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      likedPostIds,
    },
  };
};
