import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <div>
      <h1>Olá {session?.user?.name}</h1>
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
}
