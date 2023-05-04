import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import CreatePost from "../CreatePost";
import * as Dialog from "@radix-ui/react-dialog";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { ImPencil2 } from "react-icons/im";

export default function Footer() {
  const { data: session } = useSession();
  return (
    <footer className='fixed bottom-0 w-full border-t bg-body px-2 py-4 sm:hidden'>
      <nav role='navigation'>
        <ul className='flex items-center justify-evenly gap-8'>
          <li>
            <Link href={"/"} aria-label='Link para a Home' tabIndex={1}>
              <FaHome size={26} />
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link
                  href={"/dashboard"}
                  aria-label='Link para o painel de controle'
                  tabIndex={2}
                >
                  <FaUser size={26} />
                </Link>
              </li>
              <li>
                <Link
                  href={"/friends"}
                  aria-label='Link para a página de amigos'
                  tabIndex={3}
                >
                  <FaUsers size={26} />
                </Link>
              </li>
              <li>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button aria-label='Botão para Postar' tabIndex={4}>
                      <ImPencil2 size={22} />
                    </button>
                  </Dialog.Trigger>
                  <CreatePost />
                </Dialog.Root>
              </li>
              <li>
                <button
                  aria-label='Botão para Sair da sessão'
                  tabIndex={5}
                  onClick={() => signOut()}
                >
                  <FiLogOut size={26} />
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href={"/auth/login"}
                  aria-label='Link para a Tela de Login'
                  tabIndex={2}
                >
                  <FiLogIn size={26} />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </footer>
  );
}
