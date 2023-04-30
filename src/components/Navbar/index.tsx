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
                  <FaHome size={42} />
                  <span
                    className={`border-b-2 text-2xl font-bold ${
                      pathname === "/"
                        ? "border-b-neutral-200"
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
                  className='group flex items-center gap-3'
                >
                  <FaUser size={42} />
                  <span
                    className={`border-b-2 text-2xl font-bold ${
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
                <Link
                  href={"/friends"}
                  className='group flex items-center gap-3'
                >
                  <FaUsers size={42} />
                  <span
                    className={`border-b-2 text-2xl font-bold ${
                      pathname === "/friends"
                        ? "border-b-neutral-200"
                        : "border-b-transparent"
                    }`}
                  >
                    Amigos
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
  )
}
