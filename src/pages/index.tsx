import type { GetServerSideProps, GetStaticProps } from "next";
import { prisma } from "@/lib/prisma";
import MainLayout from "@/components/MainLayout";
import PostCard from "@/components/PostCard";
import { getSession } from "next-auth/react";

interface Like {
  postId: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  authorId: string;
}

interface PostProps {
  id: string;
  content: string;
  author: { name: string; email: string; image: string };
  likes: Like[];
  comments: Comment[];
}

interface FeedProps {
  feed: PostProps[];
  likedPostIds: string[];
}

function Home({ feed, likedPostIds }: FeedProps) {
  return (
    <MainLayout pageTitle='Página Principal - Cuckoo'>
      <h1 className='pl-4 text-xl font-semibold'>Página Inicial</h1>
      <div className='flex flex-col'>
        {feed.map((post) => {
          return (
            <PostCard
            key={post.id}
            isLiked={likedPostIds.includes(post.id)}
            likeCount={post.likes.length}
            commentCount={post.comments.length}
            {...post}
          />
          );
        })}
      </div>
    </MainLayout>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const currentUserId = session?.user.id;
  const feed = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, email: true, image: true },
      },
      likes: true,
      comments: true,
    },
    orderBy: { createdAt: "desc" },
  });
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
      feed: JSON.parse(JSON.stringify(feed)),
      likedPostIds,
    },
  };
};
