import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import nProgress from "nprogress";
import "@/styles/globals.css";
import "@/styles/nprogress.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  nProgress.configure({ speed: 500 });
  useEffect(() => {
    router.events.on("routeChangeStart", () => nProgress.start());
    router.events.on("routeChangeComplete", () => nProgress.done());
    router.events.on("routeChangeError", () => nProgress.done());
  }, [router.events]);
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
