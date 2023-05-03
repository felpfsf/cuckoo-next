import MainLayout from "@/components/MainLayout";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <MainLayout pageTitle='Dashboard - Cuckoo'>
        <p>Carregando...</p>
      </MainLayout>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return (
      <MainLayout pageTitle='Dashboard - Cuckoo'>
        <p>Acesso Negado, volte à página inicial</p>
      </MainLayout>
    );
  }
  return (
    <MainLayout pageTitle='Dashboard - Cuckoo'>
      <h1>Dashboard</h1>
      <h1>Olá {session?.user?.name}</h1>
      <button onClick={() => signOut()}>Sair</button>
    </MainLayout>
  );
}
