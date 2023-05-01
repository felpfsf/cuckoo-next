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
        <Footer />
        <motion.section
          className='flex min-h-screen w-full max-w-[864px] flex-col gap-4 sm:ml-20 lg:ml-[220px] lg:p-6'
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
        {/* <aside className='hidden max-w-[288px] flex-1 border-l border-gray-800 lg:block'></aside> */}
      </main>
    </>
  );
}
