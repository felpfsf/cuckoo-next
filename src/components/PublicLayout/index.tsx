import { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import { GiBirdTwitter } from "react-icons/gi";

import { motion } from "framer-motion";

import HeroImage from "../../assets/login-register-hero.svg";

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export default function PublicLayout({ children, pageTitle }: LayoutProps) {
  return (
    <>
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name='robots' content='noindex' />
        </Head>
      </>
      <motion.main
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className='flex bg-body px-4 lg:h-screen lg:p-6'
      >
        <div className='m-auto grid w-full grid-cols-1 gap-x-10 lg:w-fit lg:grid-cols-2'>
          <Image
            src={HeroImage}
            alt={""}
            width={570}
            height={570}
            className='hidden h-full max-h-[570px] w-full max-w-[570px] lg:block'
          />
          <div className='mx-auto flex max-w-md items-center gap-4 pt-2 lg:hidden'>
            <GiBirdTwitter size={42} />
            <span className='pt-2 text-xl'>Cuckoo</span>
          </div>
          <div className='mt-6 lg:mt-0 '>{children}</div>
        </div>
      </motion.main>
    </>
  );
}
