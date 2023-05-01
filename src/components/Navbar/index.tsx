import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { pathname } = useRouter();
  return (
    <aside className='absolute left-0 hidden h-screen max-w-[288px] border-r border-r-gray-800 bg-body p-5 sm:block'>
      <nav>
        <ul className='flex flex-col items-center gap-12 lg:items-start'>
          <li>
            <Link href={"/"} className='group flex items-center gap-3'>
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
            <Link href={"/dashboard"} className='group flex items-center gap-3'>
              <FaUser size={42} />
              <span
                className={`hidden border-b-2 text-2xl font-bold group-hover:border-b-neutral-200 lg:block ${
                  pathname === "/dashboard"
                    ? "border-b-neutral-200"
                    : "border-b-transparent"
                }`}
              >
                Perfil
              </span>
            </Link>
          </li>
          <li>
            <Link href={"/friends"} className='group flex items-center gap-3'>
              <FaUsers size={42} />
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
          <li className='w-full'>
            <button className='btn_hover hidden w-full items-center justify-center rounded-3xl border border-none bg-fuchsia-600 p-3 font-semibold text-white transition-colors duration-200 ease-in-out disabled:cursor-not-allowed  disabled:opacity-60 lg:flex'>
              Novo Post
            </button>
          </li>
          <li>
            <button
              className='flex items-center gap-3 text-2xl font-bold'
              aria-label='Botão para Sair da sessão'
              tabIndex={4}
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
