import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h1>Home, olá {session?.user?.name}</h1>
        <button onClick={() => signOut()}>Sair</button>
      </div>
    </>
  );
}

export default Home;
