import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido." }),
  password: z.string().min(1, { message: "Senha é obrigatória." }),
});

export const registerSchema = z.object({
  email: z.string().email({ message: "Email inválido." }),
  password: z.string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "A senha deve conter maiúscula, minúscula, número e caractere especial.",
    }),
});

export const profileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
});

export const passwordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Senha atual é obrigatória." }),
  newPassword: z
    .string()
    .min(8, { message: "A nova senha deve ter no mínimo 8 caracteres." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "A nova senha deve conter maiúscula, minúscula, número e caractere especial.",
    }),
});

export const imageSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório." }),
  image: z
    .any()
    .refine((file) => file && file.length > 0, {
      message: "Imagem é obrigatória.",
    })
    .refine(
      (file) =>
        file &&
        file[0] &&
        file[0].type.startsWith("image/"),
      {
        message: "Apenas arquivos de imagem são permitidos.",
      }
    ),
  video: z.any().optional(),
  tags: z.string().optional(),
});
