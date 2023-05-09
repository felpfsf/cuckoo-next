import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Formato de email incorreto")
    .min(1, "Email é obrigatório"),
  password: z.string().min(6, "A senha é obrigatória"),
});

export type LoginInputProps = z.infer<typeof loginSchema>;

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

export const updateUserSchema = z
  .object({
    name: z.string(),
    email: z
      .string()
      .email("Formato de email incorreto")
      .min(1, "Email é obrigatório"),
    bio: z.string().optional(),
    password: z.string().optional(),
    passwordConfirmation: z
      .string({
        required_error: "É necessário confirmar sua senha",
      })
      .optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não conferem",
    path: ["passwordConfirmation"],
  });

export type UpdateUserInputProps = z.infer<typeof updateUserSchema>;
