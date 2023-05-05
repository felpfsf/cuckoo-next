import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import AvatarMockup from "../../assets/avatar_mockup_2.png";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";

interface PostProps {
  id: string;
  content: string;
  author: { name: string; email: string; image: string };
}

export default function PostCard({
  author,
  content,
  id: postId,
  isLiked,
  likeCount,
}: PostProps & { isLiked: boolean; likeCount: number }) {
  const { data: session } = useSession();
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
    <article className='flex w-full items-start gap-4 border-t border-gray-800 px-4 py-2'>
      <figure className='col-span-1 row-span-2 mt-2 flex w-12 flex-col items-center'>
        <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-fuchsia-900'>
          <Image
            src={author.image ? author.image : AvatarMockup}
            alt='Avatar do usuário'
            width={48}
            height={48}
            className='h-full w-full object-cover'
          />
        </div>
      </figure>
      <main
        id='content'
        className='col-span-2 row-span-3 flex flex-col justify-between'
      >
        <div id='user-name' className='pt-2'>
          <p className='break-words text-sm font-semibold'>{author.name}</p>
        </div>
        <div id='post-content' className=''>
          <p className='text-sm lg:text-base'>{content}</p>
        </div>
        <div id='post-actions' className='pt-4'>
          <nav role='navigation'>
            <ul className='flex gap-12'>
              <li className=''>
                <button
                  aria-label='Comentar'
                  className='flex items-center gap-2'
                >
                  <FaRegComment />
                  Comentar
                </button>
              </li>
              <li className=''>
                <button
                  aria-label='Curtir'
                  className='flex items-center gap-2'
                  onClick={() => handleLike(postId)}
                  disabled={!session}
                >
                  {isLike ? <AiFillHeart /> : <AiOutlineHeart />}
                  {/* Like */}
                  {likeCount}
                </button>
              </li>
              <li>
                <Link
                  href={`post/${postId}`}
                  aria-label='Link para acessar o post'
                >
                  Acessar o post
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </article>
  );
}
