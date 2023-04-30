import Link from "next/link";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import PublicLayout from "@/components/PublicLayout";
import { api } from "@/lib/axios";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const submitUser = async (data: any) => {
    console.log("Register data ->", data);
    try {
      await api.post("/api/user/signup", data);
    } catch (error) {
      console.error("Error registering ->", error);
    }
  };
  return (
    <PublicLayout pageTitle='Registre-se - Cuckoo'>
      <div className='text-center'>
        <Balancer>
          <h1 className='text-xl font-semibold lg:text-2xl'>
            Registre-se e comece a postar
          </h1>
          <small className=''>
            Já tem uma conta? Faça o login{" "}
            <Link href={"/login"} className='underline underline-offset-2'>
              aqui
            </Link>
          </small>
        </Balancer>
      </div>
      <form
        className='mx-auto flex max-w-md flex-col gap-12'
        onSubmit={handleSubmit(submitUser)}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Nome</label>
          <input
            type='text'
            placeholder='Digite seu nome'
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
            {...register("name")}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            placeholder='Digite seu email'
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
            {...register("email")}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Senha</label>
          <input
            type='password'
            placeholder='Digite sua senha'
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
            {...register("password")}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Confirme sua senha</label>
          <input
            type='password'
            placeholder='Confirme sua senha'
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
            {...register("confirm_password")}
          />
        </div>
        <button
          className='btn_hover rounded-3xl border border-none bg-fuchsia-600 p-3 font-semibold transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-60'
          disabled={false}
        >
          Entrar
        </button>
      </form>
    </PublicLayout>
  );
}
