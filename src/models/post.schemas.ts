import z from "zod";

export const postSchema = z.object({
  content: z
    .string()
    .min(1, "Escreva qualquer coisa")
    .max(300, "Máximo de 300 caracteres"),
});

export type PostInputProps = z.infer<typeof postSchema>;

export const commentPostSchema = z.object({
  content: z
    .string()
    .min(1, "Escreva qualquer coisa")
    .max(300, "Máximo de 300 caracteres"),
});

export type CommentPostInputProps = z.infer<typeof commentPostSchema>;
