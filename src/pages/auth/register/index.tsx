import { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import Link from "next/link";

import { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/lib/axios";
import Balancer from "react-wrap-balancer";

import PublicLayout from "@/components/PublicLayout";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiAlertCircle, FiEyeOff, FiEye } from "react-icons/fi";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nome é obrigatório"),
    email: z
      .string()
      .email("Formato de email incorreto")
      .min(1, "Email é obrigatorio"),
    password: z.string().min(6, "A senha é obrigatória"),
    passwordConfirmation: z.string({
      required_error: "É necessário confirmar sua senha",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não conferem",
    path: ["passwordConfirmation"],
  });

export type RegisterInputProps = z.infer<typeof registerSchema>;

export default function SignUp() {
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
  } = useForm<RegisterInputProps>({ resolver: zodResolver(registerSchema) });

  const submitUser = async (data: any) => {
    // console.log("Register data ->", data);
    try {
      await api.post("/api/user/signup", data).then((response) => {
        if (response.data) {
          router.push("/auth/login");
        }
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log("Error registering ->", error?.response.data.message);
          setAuthError(error.response.data.message);
        }
      } else {
        console.error("Erro inexperado", error);
      }
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
            <Link href={"/auth/login"} className='underline underline-offset-2'>
              aqui
            </Link>
          </small>
        </Balancer>
      </div>
      <form
        className='mx-auto flex max-w-md flex-col gap-12'
        onSubmit={handleSubmit(submitUser)}
      >
        <div className='relative flex flex-col gap-2'>
          <label htmlFor=''>Nome</label>
          <input
            type='text'
            placeholder='Digite seu nome'
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
            {...register("name")}
          />
          {errors.name && (
            <div
              id='name-error'
              role='alert'
              className='absolute -bottom-6 flex items-center gap-2 text-sm text-red-500'
            >
              <FiAlertCircle size={16} />
              <span>{errors.name?.message}</span>
            </div>
          )}
        </div>
        <div className='relative flex flex-col gap-2'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Digite seu email'
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
            {...register("email")}
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
          <label htmlFor='password'>Senha</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Digite sua senha'
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            className='relative w-full border-b bg-transparent p-2 text-white outline-fuchsia-500'
            {...register("password")}
          />
          <button
            className='absolute bottom-4 right-2'
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
              <FiAlertCircle size={16} />
              <span>{errors.password?.message}</span>
            </div>
          )}
        </div>
        <div className='relative flex flex-col gap-2'>
          <label htmlFor='password-confirmation'>Confirme sua senha</label>
          <input
            type={showPassword ? "text" : "password"}
            aria-invalid={errors.passwordConfirmation ? "true" : "false"}
            aria-describedby={
              errors.passwordConfirmation
                ? "password-confirmation-error"
                : undefined
            }
            placeholder='Confirme sua senha'
            className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
            {...register("passwordConfirmation")}
          />
          <button
            type='button'
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            className='absolute bottom-4 right-2'
            onClick={handleShowPassword}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
          {errors.passwordConfirmation && (
            <div
              id='password-confirmation-error'
              role='alert'
              className='absolute -bottom-6 flex items-center gap-2 text-sm text-red-500'
            >
              <FiAlertCircle size={16} />
              <span>{errors.passwordConfirmation?.message}</span>
            </div>
          )}
        </div>
        <div className='relative w-full'>
          {authError && (
            <Balancer>
              <span
                id='auth-error'
                role='alert'
                className='absolute -top-8 flex w-full items-center justify-center gap-2 text-center text-sm text-red-500'
              >
                <FiAlertCircle size={16} />
                {authError}
              </span>
            </Balancer>
          )}
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
