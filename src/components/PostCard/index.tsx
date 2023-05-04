import Image from "next/image";
import Balancer from "react-wrap-balancer";
import AvatarMockup from "../../assets/avatar_mockup.jpg";
import { FaRegComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

interface PostProps {
  id: string;
  content: string;
  author: { name: string; email: string; image: string };
}

export default function PostCard({ author, content, id }: PostProps) {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike((prev) => !prev);
  };

  //   <div class="grid grid-rows-3 grid-flow-col gap-4">
  //   <div class="row-span-3 ...">01</div>
  //   <div class="col-span-2 ...">02</div>
  //   <div class="row-span-2 col-span-2 ...">03</div>
  // </div>
  return (
    // <article className='grid w-full grid-flow-col grid-rows-3 gap-2 border-t border-gray-800 px-4 py-2'>
    <article className='flex w-full items-start gap-4 border-t border-gray-800 px-4 pt-2'>
      <figure className='col-span-1 row-span-2 mt-2 flex w-12 flex-col items-center'>
        <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-fuchsia-900'>
          <Image
            src={author.image ? author.image : AvatarMockup}
            alt='Avatar do usuário'
            className='h-full w-full object-cover'
          />
        </div>
        {/* <figcaption>
          <div id='user-name' className='max-w-[48px]'>
            <p className='break-words text-sm font-semibold'>UsuárioUsuário</p>
          </div>
        </figcaption> */}
      </figure>
      <main
        id='content'
        className='col-span-2 row-span-3 flex flex-col justify-between'
      >
        <div id='user-name' className='pt-2'>
          <p className='break-words text-sm font-semibold'>{author.name}</p>
        </div>
        <div id='post-content' className=''>
          <p className='text-sm lg:text-base'>
            {content}
          </p>
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
                  onClick={handleLike}
                >
                  {like ? <AiFillHeart /> : <AiOutlineHeart />}
                  Like
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </article>
  );
}
