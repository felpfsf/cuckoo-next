import z from 'zod'

export const postSchema = z.object({
  content:z.string().min(1,'Escreva qualquer coisa')
})

export type PostInputProps = z.infer<typeof postSchema>