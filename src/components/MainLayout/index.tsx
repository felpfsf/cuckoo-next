import { ReactNode } from "react";
import Head from "next/head";

import { motion } from "framer-motion";

import Navbar from "../Navbar";

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
      <main className='mx-auto flex max-w-screen-xl'>
        <Navbar />
        <motion.section
          className='flex w-full flex-col gap-4  p-6'
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
        <aside className="border-l border-gray-800">Anuncios</aside>
      </main>
    </>
  );
}
