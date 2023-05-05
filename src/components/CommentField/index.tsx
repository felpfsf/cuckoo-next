import { api } from "@/lib/axios";
import {
  CommentPostInputProps,
  commentPostSchema,
} from "@/models/post.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";

interface CommentFieldProps {
  postId: string;
  onSubmit: () => void;
}

export default function CommentField({ onSubmit, postId }: CommentFieldProps) {
  const [charCount, setCharCount] = useState(0);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<CommentPostInputProps>({
    resolver: zodResolver(commentPostSchema),
    defaultValues: { content: "" },
    mode: "onChange",
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setCharCount(inputValue.length);
  };

  const submitComment = async (data: CommentPostInputProps) => {
    console.log(postId);
    try {
      const res = await api.post("api/post/comment", {
        content: data.content,
        postId,
      });
      onSubmit();
    } catch (error) {
      console.error(error);
      return "Ocorrreu um erro ao adicionar sua curtida";
    }
  };

  return (
    <form
      className='relative mt-2 flex flex-col gap-2'
      onSubmit={handleSubmit(submitComment)}
    >
      <textarea
        className='resize-none rounded-md border bg-transparent p-2 text-white outline-fuchsia-500 '
        placeholder='Escreva seu comentário...'
        {...register("content")}
        onChange={handleInputChange}
      />
      <span
        className={`absolute bottom-3 left-3 text-sm ${
          charCount >= 300 ? "text-red-500" : "text-gray-400"
        }`}
      >
        {charCount}/300
      </span>
      {errors.content && (
        <span
          id='content-error'
          role='alert'
          className='absolute -bottom-1 left-3 flex items-center gap-2 self-end text-sm text-red-500'
        >
          <FiAlertCircle />
          {errors.content?.message}
        </span>
      )}
      <button className='self-end rounded-md border px-4' type='submit'>
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
  );
}
