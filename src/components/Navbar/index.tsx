import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import CreatePost from "../CreatePost";
import * as Dialog from "@radix-ui/react-dialog";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { ImPencil2 } from "react-icons/im";
import AvatarMockup from "../../assets/avatar_mockup_2.png";

export default function Navbar() {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  return (
    <aside className='absolute left-0 top-0 hidden h-full max-w-[288px] border-r border-r-gray-800 bg-body px-2 pt-6 sm:block lg:px-6'>
      <nav
        role='navigation'
        className='relative flex min-h-[calc(100vh-5%)] flex-col items-center justify-between lg:items-start'
      >
        <ul className='flex flex-col items-center gap-12 lg:items-start'>
          <li>
            <Link
              href={"/"}
              aria-label='Link para a Home'
              className='group flex items-center gap-3'
              tabIndex={1}
            >
              <FaHome
                size={26}
                className={pathname === "/" ? "text-fuchsia-200" : ""}
              />
              <span
                className={`hidden border-b-2 text-xl font-bold group-hover:border-b-fuchsia-200 lg:block ${
                  pathname === "/"
                    ? "border-b-fuchsia-200 "
                    : "border-b-transparent"
                }`}
              >
                Página Inicial
              </span>
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link
                  href={"/dashboard"}
                  aria-label='Link para o painel de controle'
                  className='group flex items-center gap-3'
                  tabIndex={2}
                >
                  {/* <FaUser
                    size={26}
                    className={
                      pathname === "/dashboard" ? "text-fuchsia-200" : ""
                    }
                  />
                  <span
                    className={`hidden border-b-2 text-xl font-bold group-hover:border-b-neutral-200 lg:block ${
                      pathname === "/dashboard"
                        ? "border-b-fuchsia-200"
                        : "border-b-transparent"
                    }`}
                  >
                    Perfil
                  </span> */}
                  <figure className='flex w-full items-center gap-2'>
                    <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 bg-fuchsia-900 lg:h-16 lg:w-16'>
                      <Image
                        src={
                          session?.user.image
                            ? session.user.image
                            : AvatarMockup
                        }
                        alt='Avatar do usuário'
                        width={64}
                        height={64}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <figcaption>
                      <span
                        className={`hidden border-b-2 text-xl font-bold group-hover:border-b-neutral-200 lg:block ${
                          pathname === "/dashboard"
                            ? "border-b-fuchsia-200"
                            : "border-b-transparent"
                        }`}
                      >
                        Perfil
                      </span>
                    </figcaption>
                  </figure>
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
                    size={26}
                    className={
                      pathname === "/friends" ? "text-fuchsia-200" : ""
                    }
                  />
                  <span
                    className={`hidden border-b-2 text-xl font-bold group-hover:border-b-neutral-200 lg:block ${
                      pathname === "/friends"
                        ? "border-b-neutral-200"
                        : "border-b-transparent"
                    }`}
                  >
                    Amigos
                  </span>
                </Link>
              </li>
              <li>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button
                      aria-label='Botão para Postar'
                      tabIndex={4}
                      className='group flex items-center gap-3'
                    >
                      <ImPencil2 size={26} />
                      <span className='hidden border-b-2 border-b-transparent text-xl font-bold group-hover:border-b-neutral-200 lg:block'>
                        Novo Post
                      </span>
                    </button>
                  </Dialog.Trigger>
                  <CreatePost />
                </Dialog.Root>
              </li>
              <li>
                <button
                  className='flex items-center gap-3 text-xl font-bold'
                  aria-label='Botão para Sair da sessão'
                  tabIndex={5}
                  onClick={() => signOut()}
                >
                  <FiLogOut size={26} />
                  <span className='hidden lg:block'>Sair</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href={"/auth/login"}
                  aria-label='Link para a Tela de Login'
                  className='flex items-center gap-3 text-xl font-bold'
                  tabIndex={2}
                >
                  <FiLogIn size={26} />
                  <span className='hidden lg:block'>Entrar</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        {/* {session && (
          <Link href={`/dashboard`}>
            <figure className='flex w-full items-center gap-2'>
              <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 bg-fuchsia-900 lg:h-16 lg:w-16'>
                <Image
                  src={session?.user.image ? session.user.image : AvatarMockup}
                  alt='Avatar do usuário'
                  width={64}
                  height={64}
                  className='h-full w-full object-cover'
                />
              </div>
              <figcaption>
                <div id='user-name' className='hidden lg:block'>
                  <p className='text-sm font-semibold'>{session?.user.name}</p>
                </div>
              </figcaption>
            </figure>
          </Link>
        )} */}
      </nav>
    </aside>
  );
}
