import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MainLayout from "@/components/MainLayout";
import PostCard from "@/components/PostCard";

function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  // if (status === "unauthenticated") {
  //   router.push("/auth/login");
  // }

  return (
    <MainLayout pageTitle='Página Principal - Cuckoo'>
      <div className="flex flex-col">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </MainLayout>
  );
}

export default Home;
