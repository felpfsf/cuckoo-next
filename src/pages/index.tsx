import { signOut, useSession } from "next-auth/react";
import MainLayout from "@/components/MainLayout";

function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <MainLayout pageTitle='Página Principal - Cuckoo'>
      <h1>
        Home, <br />
        olá {session?.user?.name}
      </h1>
      <button onClick={() => signOut()}>Sair</button>
    </MainLayout>
  );
}

export default Home;
