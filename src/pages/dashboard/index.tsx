import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { prisma } from "@/lib/prisma";
import { api } from "@/lib/axios";
import { UpdateUserInputProps, updateUserSchema } from "@/models/user.schemas";
import MainLayout from "@/components/MainLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import AvatarMockup from "../../assets/avatar_mockup_2.png";

interface UserProps {
  user: {
    bio: string;
    email: string;
    image: string;
    name: string;
  };
}

export default function Dashboard({ user }: UserProps) {
  const { data: session, status } = useSession();
  const [authError, setAuthError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateUserInputProps>({
    resolver: zodResolver(updateUserSchema),
  });

  if (status === "loading") {
    return (
      <MainLayout pageTitle='Dashboard - Cuckoo'>
        <div className='p-4'>
          <p>Carregando...</p>
        </div>
      </MainLayout>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return (
      <MainLayout pageTitle='Dashboard - Cuckoo'>
        <div className='p-4'>
          <p>Acesso Negado, volte à página inicial</p>
        </div>
      </MainLayout>
    );
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const submitUpdateUser = async (data: UpdateUserInputProps) => {
    const { bio, password, ...rest } = data;
    const updatedData: UpdateUserInputProps = {
      name: data.name,
      email: data.email,
    };

    if (data.password) {
      updatedData.password = password;
    }
    if (data.bio) {
      updatedData.bio = bio;
    }

    try {
      await api.put("api/user/update", updatedData).then((response) => {
        if (response.data) {
          router.push(`/users/${session?.user.id}`);
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
    <MainLayout pageTitle={`Editar perfil de ${user.name} - Cuckoo`}>
      <div className='p-4'>
        <div className='mb-8'>
          <Link href={"/"} className='group flex items-center gap-4'>
            <BsArrowLeftShort size={32} />
            <span className='border-b-fuchsia-200 text-xl font-semibold group-hover:border-b'>
              Retornar
            </span>
          </Link>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='my-4 text-xl font-semibold'>Olá</h1>
          <figure className='flex flex-col items-center gap-3'>
            <div className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-fuchsia-900'>
              <Image
                src={user?.image ? user.image : AvatarMockup}
                alt='Avatar do usuário'
                width={64}
                height={64}
                className='h-full w-full object-cover'
              />
            </div>
            <figcaption>
              <p className='text-xl font-semibold'>{user.name}</p>
            </figcaption>
          </figure>
          <h1 className='mb-12 mt-4 text-xl font-semibold'>
            Deseja alterar seus dados?
          </h1>
          <form
            className='mx-auto flex w-full max-w-2xl flex-col gap-12'
            onSubmit={handleSubmit(submitUpdateUser)}
          >
            <div className='relative flex w-full flex-col'>
              <input
                type='text'
                placeholder='Altere seu nome'
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                defaultValue={user.name as string}
                className='border-b bg-transparent p-2 text-white outline-fuchsia-500 disabled:text-gray-500'
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

            <div className='relative flex w-full flex-col'>
              <input
                type='email'
                placeholder='Altere seu email'
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                defaultValue={user.email as string}
                className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
                {...register("email")}
              />
              {errors.name && (
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
            <div className='relative flex w-full flex-col'>
              <textarea
                placeholder='Adicione uma bio'
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                maxLength={200}
                defaultValue={user.bio}
                className='resize-none border-b bg-transparent p-2 text-white outline-fuchsia-500'
                {...register("bio")}
              />
              {errors.name && (
                <div
                  id='bio-error'
                  role='alert'
                  className='absolute -bottom-6 flex items-center gap-2 text-sm text-red-500'
                >
                  <FiAlertCircle size={16} />
                  <span>{errors.bio?.message}</span>
                </div>
              )}
            </div>
            <div className='relative flex w-full flex-col'>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete='new-password'
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                placeholder='Digite sua nova senha'
                className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
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
            <div className='relative flex w-full flex-col'>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete='new-password'
                aria-invalid={errors.passwordConfirmation ? "true" : "false"}
                aria-describedby={
                  errors.passwordConfirmation
                    ? "password-confirmation-error"
                    : undefined
                }
                placeholder='Confirme sua nova senha'
                className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
                {...register("passwordConfirmation")}
              />
              <button
                className='absolute bottom-4 right-2'
                type='button'
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
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
                <span
                  id='auth-error'
                  role='alert'
                  className='absolute -top-8 flex w-full items-center justify-center gap-2 text-center text-sm text-red-500'
                >
                  <FiAlertCircle size={16} />
                  {authError}
                </span>
              )}
              <button
                type='submit'
                disabled={isSubmitting}
                aria-busy={isSubmitting ? "true" : "false"}
                className='btn_hover flex w-full items-center justify-center rounded-3xl border border-none bg-fuchsia-600 p-3 font-semibold text-white transition-colors duration-200 ease-in-out disabled:cursor-not-allowed  disabled:opacity-60'
              >
                {isSubmitting ? (
                  <div className='flex items-center gap-2'>
                    <AiOutlineLoading3Quarters
                      size={18}
                      className='animate-spin'
                    />
                    Carregando...
                  </div>
                ) : (
                  "Alterar Dados"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const user =
    session &&
    (await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        name: true,
        email: true,
        image: true,
        bio: true,
      },
    }));

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
