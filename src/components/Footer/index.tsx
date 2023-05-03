import Link from "next/link";
import { signOut } from "next-auth/react";

import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { ImPencil2 } from "react-icons/im";
import * as Dialog from "@radix-ui/react-dialog";
import CreatePost from "../CreatePost";

export default function Footer() {
  return (
    <footer className='fixed bottom-0 w-full border-t bg-body px-2 py-4 sm:hidden'>
      <nav role='navigation'>
        <ul className='flex items-center justify-evenly gap-8'>
          <li>
            <Link href={"/"} aria-label='Link para a Home' tabIndex={1}>
              <FaHome size={26} />
            </Link>
          </li>
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
                  <ImPencil2 size={26} />
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
        </ul>
      </nav>
    </footer>
  );
}
