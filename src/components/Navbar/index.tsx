import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import CreatePost from "../CreatePost";
import { ImPencil2 } from "react-icons/im";

export default function Navbar() {
  const { pathname } = useRouter();
  return (
    <aside className='absolute left-0 top-0 hidden h-full max-w-[288px] border-r border-r-gray-800 bg-body px-4 pt-6 sm:block'>
      <nav role='navigation'>
        <ul className='flex flex-col items-center gap-12 lg:items-start'>
          <li>
            <Link
              href={"/"}
              aria-label='Link para a Home'
              className='group flex items-center gap-3'
              tabIndex={1}
            >
              <FaHome
                size={42}
                className={pathname === "/" ? "text-fuchsia-200" : ""}
              />
              <span
                className={`hidden border-b-2 text-2xl font-bold group-hover:border-b-fuchsia-200 lg:block ${
                  pathname === "/"
                    ? "border-b-fuchsia-200 "
                    : "border-b-transparent"
                }`}
              >
                Página Inicial
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={"/dashboard"}
              aria-label='Link para o painel de controle'
              className='group flex items-center gap-3'
              tabIndex={2}
            >
              <FaUser
                size={42}
                className={pathname === "/dashboard" ? "text-fuchsia-200" : ""}
              />
              <span
                className={`hidden border-b-2 text-2xl font-bold group-hover:border-b-neutral-200 lg:block ${
                  pathname === "/dashboard"
                    ? "border-b-fuchsia-200"
                    : "border-b-transparent"
                }`}
              >
                Perfil
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={"/friends"}
              aria-label='Link para a página de amigos'
              className='group flex items-center gap-3'
              tabIndex={3}
            >
              <FaUsers
                size={42}
                className={pathname === "/friends" ? "text-fuchsia-200" : ""}
              />
              <span
                className={`hidden border-b-2 text-2xl font-bold group-hover:border-b-neutral-200 lg:block ${
                  pathname === "/friends"
                    ? "border-b-neutral-200"
                    : "border-b-transparent"
                }`}
              >
                Amigos
              </span>
            </Link>
          </li>
          {/* <li className='w-full'>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  aria-label='Botão para Postar'
                  className='btn_hover hidden w-full items-center justify-center rounded-3xl border border-none bg-fuchsia-600 p-3 font-semibold text-white transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-60 lg:flex'
                  tabIndex={4}
                >
                  Novo Post
                </button>
              </Dialog.Trigger>
              <CreatePost />
            </Dialog.Root>
          </li> */}
          <li>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button aria-label='Botão para Postar' tabIndex={4}>
                  <ImPencil2 size={26} />
                  <span
                    className={`hidden border-b-2 text-2xl font-bold group-hover:border-b-neutral-200 lg:block ${
                      pathname === "/friends"
                        ? "border-b-neutral-200"
                        : "border-b-transparent"
                    }`}
                  >
                    Novo Post
                  </span>
                </button>
              </Dialog.Trigger>
              <CreatePost />
            </Dialog.Root>
          </li>
          <li>
            <button
              className='flex items-center gap-3 text-2xl font-bold'
              aria-label='Botão para Sair da sessão'
              tabIndex={5}
              onClick={() => signOut()}
            >
              <FiLogOut size={26} />
              <span className='hidden lg:block'>Sair</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
