import { useState } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";

import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

import PublicLayout from "@/components/PublicLayout";

import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import IconGoogle from "../../../assets/google_icon.svg";
import IconGithub from "../../../assets/github_icon.svg";
import { LoginInputProps, loginSchema } from "@/models/user.schemas";

export default function SignIn() {
  const [authError, setAuthError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginInputProps>({ resolver: zodResolver(loginSchema) });

  const submitLoginUser = async (data: LoginInputProps) => {
    // console.log("Login data ->", data);
    try {
      const res = await signIn("credentials", {
        callbackUrl: "/",
        redirect: false,
        ...data,
      });
      if (res?.ok) {
        router.push("/");
      } else {
        console.log(res?.error);
        setAuthError(res?.error as string);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log("Error registering ->", error?.response.data.message);
        }
      } else {
        console.error("Erro inexperado", error);
      }
    }
  };
  return (
    <PublicLayout pageTitle='Efetuar Login - Cuckoo'>
      <div className='text-center'>
        <Balancer>
          <h1 className='text-xl font-semibold lg:text-2xl'>
            Faça o login e comece a postar
          </h1>
          <small className=''>
            Não tem uma conta? Registre-se{" "}
            <Link
              href={"/auth/register"}
              className='underline underline-offset-2'
            >
              aqui
            </Link>
          </small>
        </Balancer>
      </div>
      <form
        className='mx-auto mt-6 flex max-w-md flex-col gap-12'
        onSubmit={handleSubmit(submitLoginUser)}
      >
        <div className='relative flex flex-col gap-2'>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder='Digite seu email'
            {...register("email")}
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
          />
          {errors.email && (
            <div
              id='email-error'
              role='alert'
              className='absolute -bottom-6 flex items-center gap-2 text-sm text-red-500'
            >
              <FiAlertCircle size={16} />
              <span>{errors.email?.message}</span>
            </div>
          )}
        </div>
        <div className='relative flex flex-col gap-2'>
          <label htmlFor=''>Senha</label>
          <input
            type={showPassword ? "text" : "password"}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            placeholder='Digite sua senha'
            {...register("password")}
            className='relative border-b bg-transparent p-2 text-white outline-fuchsia-500'
          />
          <button
            className='absolute bottom-3 right-2'
            type='button'
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            onClick={handleShowPassword}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
          {errors.password && (
            <div
              id='password-error'
              role='alert'
              className='absolute -bottom-6 flex items-center gap-2 text-sm text-red-500'
            >
              <FiAlertCircle />
              <span>{errors.password?.message}</span>
            </div>
          )}
        </div>
        <div className='relative w-full'>
          {
            <Balancer>
              <span
                id='auth-error'
                role='alert'
                className='absolute -top-8 w-full text-center text-sm text-red-500'
              >
                {authError}
                {errors.root?.message}
              </span>
            </Balancer>
          }
          <button
            type='submit'
            disabled={isSubmitting}
            aria-busy={isSubmitting ? "true" : "false"}
            aria-describedby={authError ? "auth-error" : undefined}
            className='btn_hover flex w-full items-center justify-center rounded-3xl border border-none bg-fuchsia-600 p-3 font-semibold text-white transition-colors duration-200 ease-in-out disabled:cursor-not-allowed  disabled:opacity-60'
          >
            {isSubmitting ? (
              <div className='flex items-center gap-2'>
                <AiOutlineLoading3Quarters size={18} className='animate-spin' />
                Carregando...
              </div>
            ) : (
              "Entrar"
            )}
          </button>
        </div>
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
            aria-disabled='true'
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
