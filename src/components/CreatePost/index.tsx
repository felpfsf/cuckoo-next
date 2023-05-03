import * as Dialog from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";

export default function CreatePost() {
  const { data: session } = useSession();
  console.log(session)
  return (
    <Dialog.Portal>
      <Dialog.Content className='fixed bottom-16 left-0 h-[calc(100vh-50%)] w-full rounded-md border bg-body data-[state=open]:animate-contentShown sm:left-[50%] sm:top-[50%] sm:max-w-xl sm:-translate-x-[50%] sm:-translate-y-[35%] data-[state=open]:sm:animate-contentShownSm'>
        <form className='mt-8 flex flex-col gap-8 p-4'>
          <fieldset className='flex flex-col gap-2'>
            <label htmlFor='post' className='font-semibold uppercase'>
              Content(não sei o que colocar aqui, to com sono)
            </label>
            <textarea
              name='post'
              id='post'
              placeholder='Manda um cuckoo aí'
              className='h-28 resize-none rounded-md border-b bg-transparent p-2 text-white outline-fuchsia-500'
            ></textarea>
          </fieldset>
          <button className='self-end rounded-md border px-6'>Enviar</button>
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
