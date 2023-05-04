import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

interface PostProps {
  content: string;
}

export default function CreatePost() {
  const router = useRouter();
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<PostProps>();

  const submitPost = async (data: PostProps) => {
    console.log(data);
    try {
      await api.post("api/compose/post", data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog.Portal>
      <Dialog.Content className='fixed bottom-16 left-0 h-[calc(100vh-50%)] w-full rounded-md border bg-body data-[state=open]:animate-contentShown sm:left-[50%] sm:top-[50%] sm:max-w-xl sm:-translate-x-[50%] sm:-translate-y-[35%] data-[state=open]:sm:animate-contentShownSm'>
        <form
          className='mt-8 flex flex-col gap-8 p-4'
          onSubmit={handleSubmit(submitPost)}
        >
          <fieldset className='flex flex-col gap-2'>
            <label htmlFor='post' className='font-semibold uppercase'>
              Content(não sei o que colocar aqui, to com sono)
            </label>
            <textarea
              // name='post'
              id='post'
              placeholder='Manda um cuckoo aí'
              className='h-28 resize-none rounded-md border-b bg-transparent p-2 text-white outline-fuchsia-500'
              {...register("content")}
            ></textarea>
          </fieldset>
          <button
            type='submit'
            disabled={isSubmitting}
            aria-busy={isSubmitting ? "true" : "false"}
            // aria-describedby={authError ? "auth-error" : undefined}
            className='btn_hover flex w-full items-center justify-center rounded-3xl border border-none bg-fuchsia-600 p-3 font-semibold text-white transition-colors duration-200 ease-in-out disabled:cursor-not-allowed  disabled:opacity-60'
          >
            {isSubmitting ? (
              <div className='flex items-center gap-2'>
                <AiOutlineLoading3Quarters size={18} className='animate-spin' />
                Carregando...
              </div>
            ) : (
              "Enviar"
            )}
          </button>
        </form>
        <Dialog.Close asChild>
          <button className='absolute right-4 top-2'>
            <AiOutlineClose size={26} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
