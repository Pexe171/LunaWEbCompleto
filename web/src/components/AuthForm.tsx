"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader2 } from "lucide-react";
import { loginSchema, registerSchema } from "@/lib/validators";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";
import { api } from "@/lib/api";

type AuthFormType = "login" | "register";

interface AuthFormProps {
  type: AuthFormType;
  onSubmit: (data: z.infer<typeof loginSchema | typeof registerSchema>) => Promise<void>;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const router = useRouter();

  const formSchema = type === "login" ? loginSchema : registerSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Você foi autenticado com sucesso.",
      });
      router.push('/');
    },
    onError: (error) => {
      toast({
        title: "Erro na autenticação",
        description: error.response?.data?.message || "Ocorreu um erro.",
        variant: "destructive",
      });
    }
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate(data);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{type === "login" ? "Login" : "Cadastro"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {type === "login" ? "Entrar" : "Criar Conta"}
            </Button>
          </form>
        </Form>
        {type === "login" ? (
          <p className="mt-4 text-center text-sm text-gray-500">
            Não tem uma conta?{" "}
            <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Cadastre-se
            </Link>
          </p>
        ) : (
          <p className="mt-4 text-center text-sm text-gray-500">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Faça login
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthForm;
