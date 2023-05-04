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
}

function Home({ feed }: FeedProps) {
  return (
    <MainLayout pageTitle='Página Principal - Cuckoo'>
      <h1 className='text-xl font-semibold'>Página Inicial</h1>
      <div className='flex flex-col'>
        {feed.map((post) => (
          <PostCard key={post.id} {...post} />
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
  return {
    props: { feed: JSON.parse(JSON.stringify(feed)) },
    revalidate: 10,
  };
};
