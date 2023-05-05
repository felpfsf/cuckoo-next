import { GetStaticProps } from "next";
import { prisma } from "@/lib/prisma";
import MainLayout from "@/components/MainLayout";
import PostCard from "@/components/PostCard";

interface PostProps {
  id: string;
  content: string;
  author: { name: string; email: string; image: string };
}

interface FeedProps {
  feed: PostProps[];
  likedPostIds: any;
}

function Home({ feed, likedPostIds }: FeedProps) {
  return (
    <MainLayout pageTitle='Página Principal - Cuckoo'>
      <h1 className='pl-4 text-xl font-semibold'>Página Inicial</h1>
      <div className='flex flex-col'>
        {feed.map((post) => (
          <PostCard
            key={post.id}
            isLiked={likedPostIds.includes(post.id)}
            {...post}
          />
        ))}
      </div>
    </MainLayout>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, email: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  const likedPosts = await prisma.like.findMany({ select: { postId: true } });
  console.log(likedPosts);
  const likedPostIds = likedPosts.map((like) => like.postId);
  return {
    props: {
      feed: JSON.parse(JSON.stringify(feed)),
      likedPostIds,
    },
    revalidate: 10,
  };
};
