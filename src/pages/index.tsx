import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex flex-col gap-4'>
        <h1>
          Home, <br />
          olá {session?.user?.name}
        </h1>
        <Link href={"/dashboard"}>Dashboard</Link>
        <button onClick={() => signOut()}>Sair</button>
      </div>
    </>
  );
}

export default Home;
