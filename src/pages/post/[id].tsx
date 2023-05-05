import MainLayout from "@/components/MainLayout";
import { prisma } from "@/lib/prisma";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import AvatarMockup from "../../assets/avatar_mockup_2.png";

interface Like {
  postId: string;
}

interface Comment {
  author: { name: string; image: string };
  content: string;
  id: string;
}

interface PostProps {
  id: string;
  content: string;
  author: { name: string; image: string };
  likes: Like[];
  comments: Comment[];
}

export default function Post({ post }: { post: PostProps }) {
  console.log(post);
  return (
    <MainLayout pageTitle={"Post"}>
      <div className='p-4'>
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
          <p className='text-sm text-gray-600 mt-4'>Horário etc...</p>
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
              <div>
                <p className='text-sm font-semibold'>{comment.author.name}</p>
                <p className='text-sm'>{comment.content}</p>
                <p className='text-sm text-gray-600'>Horário etc...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params?.id);
  const post = await prisma.post.findUnique({
    where: { id: String(params?.id) },
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
        },
      },
    },
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};
