import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence
      mode='wait'
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AnimatePresence>
  );
}
