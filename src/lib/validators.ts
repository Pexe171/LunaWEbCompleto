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

export const imageSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório." }),
  url: z.string().optional().refine(val => {
    if (val) {
      try { new URL(val); return true; } catch { return false; }
    }
    return true;
  }, { message: "URL inválida." }),
  fileId: z.string().optional(),
  tags: z.string().optional(),
}).refine(data => !!data.url || !!data.fileId, {
  message: "Pelo menos uma URL ou um FileId deve ser fornecido.",
  path: ["url"]
});
