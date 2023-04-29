import { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import HeroImage from "../../assets/login-register-hero.svg";

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export default function PublicLayout({ children, pageTitle }: LayoutProps) {
  return (
    <div>
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name='robots' content='noindex' />
        </Head>
      </>
      <main className='flex h-screen bg-body p-6'>
        <div className='m-auto grid gap-x-10 lg:grid-cols-2'>
          <Image
            src={HeroImage}
            alt={"imagem"}
            width={570}
            height={570}
            className='h-full max-h-[570px] w-full max-w-[570px]'
          />
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}
