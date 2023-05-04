import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostInputProps, postSchema } from "@/models/post.schemas";

import * as Dialog from "@radix-ui/react-dialog";

import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";

export default function CreatePost() {
  const router = useRouter();
  const [charCount, setCharCount] = useState(0);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<PostInputProps>({
    resolver: zodResolver(postSchema),
    defaultValues: { content: "" },
    mode: "onChange",
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setCharCount(inputValue.length);
  };

  const submitPost = async (data: PostInputProps) => {
    // console.log(data);
    try {
      const res = await api.post("api/compose/post", data);
      if (res.status === 201) {
        router.push("/");
        reset();
        window.location.reload();
      }
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
          <fieldset className='relative flex flex-col gap-2'>
            <label htmlFor='post' className='font-semibold uppercase'>
              Conte o que você está pensando
            </label>
            <textarea
              id='post'
              aria-describedby={errors.content ? "content-error" : undefined}
              placeholder='Manda um cuckoo aí'
              className='h-28 resize-none rounded-md border-b bg-transparent p-2 text-white outline-fuchsia-500 '
              {...register("content")}
              onChange={handleInputChange}
            ></textarea>
            <span
              className={`text-sm absolute -bottom-6 left-3 ${
                charCount >= 300 ? "text-red-500" : "text-gray-400"
              }`}
            >
              {charCount}/300
            </span>
            {errors.content && (
              <span
                id='content-error'
                role='alert'
                className='absolute -bottom-6 right-3 flex items-center gap-2 self-end text-sm text-red-500'
              >
                <FiAlertCircle />
                {errors.content?.message}
              </span>
            )}
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
