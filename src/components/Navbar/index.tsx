import { useRouter } from "next/router";
import Link from "next/link";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";

export default function Navbar() {
  const { pathname } = useRouter();
  return (
    <aside className='hidden h-screen w-full max-w-[288px] border-r border-r-gray-800 p-5 md:block'>
      <nav>
        <ul className='flex flex-col gap-12'>
          <li>
            <Link href={"/"} className='group flex items-center gap-3'>
              <FaHome
                size={42}
                className={pathname === "/" ? "text-fuchsia-200" : ""}
              />
              <span
                className={`border-b-2 text-2xl font-bold group-hover:border-b-fuchsia-200 ${
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
                className={`border-b-2 text-2xl font-bold group-hover:border-b-neutral-200 ${
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
                className={`border-b-2 text-2xl font-bold group-hover:border-b-neutral-200 ${
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
            <button className='btn_hover flex w-full items-center justify-center rounded-3xl border border-none bg-fuchsia-600 p-3 font-semibold text-white transition-colors duration-200 ease-in-out disabled:cursor-not-allowed  disabled:opacity-60'>
              Novo Post
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
