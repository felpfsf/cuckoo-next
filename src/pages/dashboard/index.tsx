import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";
import { BsArrowLeftShort } from "react-icons/bs";

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
      <div className='p-4'>
        <div className='mb-8'>
          <Link href={"/"} className='group flex items-center gap-4'>
            <BsArrowLeftShort size={32} />
            <span className='border-b-fuchsia-200 text-xl font-semibold group-hover:border-b'>
              Retornar
            </span>
          </Link>
        </div>
        <h1>Dashboard</h1>
        <h1>Olá {session?.user?.name}</h1>
        <button onClick={() => signOut()}>Sair</button>
      </div>
    </MainLayout>
  );
}
