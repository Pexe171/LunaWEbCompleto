"use client";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const profileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "A senha deve conter maiúscula, minúscula, número e caractere especial"
    ),
});

export default function ProfilePage() {
  const { logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/users/me").then((res) => res.data),
  });

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", bio: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  const updateProfile = useMutation({
    mutationFn: (values: z.infer<typeof profileSchema>) => api.put("/users/me", values),
    onSuccess: () => {
      toast({ title: "Perfil atualizado" });
    },
    onError: () => {
      toast({ title: "Erro ao atualizar perfil", variant: "destructive" });
    },
  });

  const updatePassword = useMutation({
    mutationFn: (values: z.infer<typeof passwordSchema>) => api.put("/users/change-password", values),
    onSuccess: () => {
      toast({ title: "Senha atualizada" });
      passwordForm.reset();
    },
    onError: () => {
      toast({ title: "Erro ao atualizar senha", variant: "destructive" });
    },
  });

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (data && !profileForm.getValues("name") && !profileForm.getValues("bio")) {
    profileForm.reset({ name: data.name || "", bio: data.bio || "" });
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-foreground">Perfil</h1>

      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit((values) => updateProfile.mutate(values))}
          className="space-y-4 bg-background border border-secondary rounded p-4"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={data?.email} disabled />
          </div>
          <FormField
            control={profileForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Opcional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Opcional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary text-primary-foreground">
            Salvar
          </Button>
        </form>
      </Form>

      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit((values) => updatePassword.mutate(values))}
          className="space-y-4 bg-background border border-secondary rounded p-4"
        >
          <FormField
            control={passwordForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha atual</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary text-primary-foreground">
            Alterar senha
          </Button>
        </form>
      </Form>

      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
