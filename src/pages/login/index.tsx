import Link from "next/link";
import Image from "next/image";
import PublicLayout from "@/components/PublicLayout";
import Balancer from "react-wrap-balancer";
import IconGoogle from "../../assets/google_icon.svg";
import IconGithub from "../../assets/github_icon.svg";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <PublicLayout pageTitle='Efetuar Login - Cuckoo'>
      <div className='text-center'>
        <Balancer>
          <h1 className='text-xl font-semibold lg:text-2xl'>
            Faça o login e comece a postar
          </h1>
          <small className=''>
            Não tem uma conta? Registre-se{" "}
            <Link href={"/register"} className='underline underline-offset-2'>
              aqui
            </Link>
          </small>
        </Balancer>
      </div>
      <form className='mx-auto mt-8 flex max-w-md flex-col gap-12'>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            placeholder='Digite seu email'
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Senha</label>
          <input
            type='password'
            placeholder='Digite sua senha'
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
          />
        </div>
        <button
          className='btn_hover rounded-3xl border border-none bg-fuchsia-600 p-3 font-semibold transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-60'
          disabled={false}
        >
          Entrar
        </button>
      </form>
      {/* Social Login */}
      <div className='mt-10 flex flex-col items-center'>
        <p className='text-center text-gray-300'>Ou continue com</p>
        <div id='social-login' className='mt-6 flex items-center gap-12'>
          <button
            title='Entre usando sua conta Google'
            className='flex flex-col items-center gap-2'
            onClick={() => signIn("google")}
          >
            <Image src={IconGoogle} alt={"Icone do Google"} />
            Google
          </button>
          <button
            title='Entre usando sua conta Github'
            disabled
            className='flex flex-col items-center gap-2 disabled:cursor-not-allowed'
            onClick={() => signIn("github")}
          >
            <Image src={IconGithub} alt={"Icone do Github"} />
            Github
          </button>
        </div>
      </div>
      {/* Social Login */}
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
