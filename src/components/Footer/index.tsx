import Link from "next/link";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className='fixed bottom-0 w-full border-t bg-body p-4 sm:hidden'>
      <nav role='navigation'>
        <ul className='flex items-center justify-evenly gap-16'>
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
            <button aria-label='Botão para Sair da sessão' tabIndex={4}>
              <FiLogOut size={26} />
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
