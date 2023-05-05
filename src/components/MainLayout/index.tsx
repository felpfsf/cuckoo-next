import { ReactNode } from "react";
import Head from "next/head";

import { motion } from "framer-motion";

import Navbar from "../Navbar";
import Footer from "../Footer";

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export default function MainLayout({ children, pageTitle }: LayoutProps) {
  return (
    <>
      <>
        <Head>
          <title>{pageTitle}</title>
        </Head>
      </>
      <main className='relative mx-auto flex max-w-screen-xl'>
        <Navbar />

        <motion.section
          className='flex min-h-screen w-full max-w-5xl flex-col gap-4 border-r border-gray-800 pb-20 sm:ml-[72px] lg:ml-52'
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {children}
        </motion.section>
        <Footer />
        <aside className='hidden max-w-[288px] flex-1 border-l border-gray-800 lg:block'>Anuncios</aside>
      </main>
    </>
  );
}
