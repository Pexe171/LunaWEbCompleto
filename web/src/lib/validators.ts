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
  url: z.string().url({ message: "URL da imagem é obrigatória." }),
  videoUrl: z.string().url({ message: "URL do vídeo inválida." }).optional(),
  tags: z.string().optional(),
});
