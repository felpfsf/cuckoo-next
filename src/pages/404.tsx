import Link from "next/link";
import MainLayout from "@/components/MainLayout";
import ImageNotFound from "../assets/404 Error with a cute animal-amico.svg";
import Image from "next/image";
export default function NotFound() {
  return (
    <MainLayout pageTitle='Página não encontrada - Cuckoo'>
      <div className='flex flex-col items-center text-center'>
        <Image src={ImageNotFound} alt={""} />
        <h2 className='mb-4 text-4xl font-bold'>Página não encontrada</h2>
        <Link
          className='text-2xl font-light text-purple-500 underline underline-offset-4 hover:text-purple-800'
          href='/'
        >
          Retorne à página principal
        </Link>
      </div>
    </MainLayout>
  );
}
