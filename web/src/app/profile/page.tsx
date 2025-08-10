"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, passwordSchema } from "@/lib/validators";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { format } from "date-fns";

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => {
        queryClient.setQueryData(["auth"], { user: res.data });
      })
      .catch(() => {});
  }, [queryClient]);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
    },
  });

  useEffect(() => {
    profileForm.reset({ name: user?.name || "", bio: user?.bio || "" });
  }, [user, profileForm]);

  const profileMutation = useMutation({
    mutationFn: (data: z.infer<typeof profileSchema>) =>
      api.put("/users/me", data).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], { user: data });
      toast({ title: "Perfil atualizado" });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar perfil",
        variant: "destructive",
      });
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const passwordMutation = useMutation({
    mutationFn: (data: z.infer<typeof passwordSchema>) =>
      api.post("/users/change-password", data),
    onSuccess: () => {
      toast({ title: "Senha atualizada" });
      passwordForm.reset();
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar senha",
        variant: "destructive",
      });
    },
  });

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-500">
            Email: {user?.email}
          </p>
          {user?.licenseExpiresAt && (
            <p className="mb-4 text-sm text-gray-500">
              Licença expira em: {format(new Date(user.licenseExpiresAt), "dd/MM/yyyy")}
            </p>
          )}
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit((data) => profileMutation.mutate(data))}
              className="space-y-4"
            >
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={profileMutation.isPending}>
                Salvar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit((data) => passwordMutation.mutate(data))}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha Atual</FormLabel>
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
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={passwordMutation.isPending}>
                Atualizar Senha
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Button variant="destructive" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  );
}
