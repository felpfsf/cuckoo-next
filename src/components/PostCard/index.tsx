import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "@/lib/axios";
import CommentField from "../CommentField";
import { FaRegComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import AvatarMockup from "../../assets/avatar_mockup_2.png";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    email: string;
    id: string;
    image: string;
  };
  content: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
}

export default function PostCard({
  author,
  commentCount,
  content,
  createdAt,
  isLiked,
  likeCount,
  id: postId,
}: PostCardProps) {
  const [showCommentField, setShowCommentField] = useState(false);
  const [isLike, setIsLiked] = useState(isLiked);
  const { data: session } = useSession();
  console.log(createdAt);

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

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const distance = formatDistanceToNow(newDate, { locale: ptBR });

    let formattedDate;
    if (distance.startsWith("cerca de")) {
      const newDistance = distance.replace("cerca de", "").trim();
      formattedDate = `${newDistance}`;
    } else if (distance.includes("minuto")) {
      const minutesMatch = distance.match(/\d+/);
      const minutesAgo = minutesMatch ? parseInt(minutesMatch[0], 10) : 0;
      formattedDate = `${minutesAgo} min`;
    } else {
      formattedDate = `${format(newDate, "d 'de' MMM", {
        locale: ptBR,
      })}`;
    }
    return formattedDate;
  };

  const handleCommentSubmit = () => {
    setShowCommentField((prev) => !prev);
  };

  return (
    <article className='flex w-full items-start gap-4 border-t border-gray-800 px-4 py-2'>
      <figure className='mt-2 flex w-12 flex-col items-center'>
        <Link href={`users/${author.id}`}>
          <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-fuchsia-900'>
            <Image
              src={author.image ? author.image : AvatarMockup}
              alt='Avatar do usuário'
              width={48}
              height={48}
              className='h-full w-full object-cover'
            />
          </div>
        </Link>
      </figure>
      <main
        id='content'
        className='relative flex w-full flex-col justify-between'
      >
        <div id='user-name' className='pt-2'>
          <p className='break-words text-sm font-semibold'>{author.name}</p>
        </div>
        <div id='post-content'>
          <Link href={`post/${postId}`} aria-label='Link para acessar o post'>
            <p className='text-sm lg:text-base'>{content}</p>
          </Link>
        </div>
        <span className='absolute right-0 text-xs text-gray-400'>
          {formatDate(createdAt)}
        </span>
        <div id='post-actions' className='pt-4'>
          <nav role='navigation'>
            <ul className='flex gap-12'>
              <li>
                <button
                  aria-label='Comentar'
                  className='flex items-center gap-2'
                  disabled={!session}
                  onClick={handleCommentSubmit}
                >
                  <FaRegComment />
                  {/* Comentar */}
                  {commentCount}
                </button>
              </li>
              <li>
                <button
                  aria-label='Curtir'
                  className='flex items-center gap-2'
                  disabled={!session}
                  onClick={() => handleLike(postId)}
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
                  Acessar
                </Link>
              </li>
            </ul>
          </nav>
          {showCommentField && (
            <CommentField postId={postId} onSubmit={handleCommentSubmit} />
          )}
        </div>
      </main>
    </article>
  );
}
