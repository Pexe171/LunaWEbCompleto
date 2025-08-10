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
import { useToast } from "./ui/use-toast";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useAuth } from "@/hooks/useAuth";

type AuthFormType = "login" | "register";

// Tipos separados para evitar union inválida no typeof condicional
type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;
type FormValues = LoginValues | RegisterValues;

interface AuthFormProps {
  type: AuthFormType;
  onSubmit: (data: FormValues) => Promise<void>;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { loginWithGoogle, loginWithFacebook } = useAuth();

  const formSchema = type === "login" ? loginSchema : registerSchema;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    } as any,
  });

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      toast({
        title: type === "login" ? "Sucesso!" : "Cadastro efetuado",
        description:
          type === "login"
            ? "Você foi autenticado com sucesso."
            : "Sua conta foi criada. Faça login para continuar.",
      });
      router.push(type === "login" ? "/" : "/login");
    },
    onError: (error: any) => {
      console.error(error);
      // junta as duas versões: usa message OU o primeiro erro validado do backend
      const description =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        (type === "login" ? "Ocorreu um erro." : "Ocorreu um erro no cadastro.");
      toast({
        title: type === "login" ? "Erro na autenticação" : "Erro no cadastro",
        description,
        variant: "destructive",
      });
    },
  });

  function handleSubmit(data: FormValues) {
    mutation.mutate(data);
  }

  async function handleGoogleSuccess(credentialResponse: any) {
    if (!credentialResponse?.credential) return;
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast({ title: "Sucesso!", description: "Você foi autenticado com sucesso." });
      router.push("/");
    } catch {
      /* erro tratado no contexto */
    }
  }

  async function handleFacebookSuccess(response: any) {
    if (!response?.accessToken) return;
    try {
      await loginWithFacebook(response.accessToken);
      toast({ title: "Sucesso!", description: "Você foi autenticado com sucesso." });
      router.push("/");
    } catch {
      /* erro tratado no contexto */
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {type === "login" ? "Login" : "Cadastro"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email" as any
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
              name="password" as any
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

        {type === "login" && (
          <div className="mt-4 flex flex-col space-y-2">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                toast({
                  title: "Erro na autenticação",
                  description: "Falha ao entrar com Google.",
                  variant: "destructive",
                })
              }
            />
            <FacebookLogin
              appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ""}
              onSuccess={handleFacebookSuccess}
              onFail={() =>
                toast({
                  title: "Erro na autenticação",
                  description: "Falha ao entrar com Facebook.",
                  variant: "destructive",
                })
              }
            />
          </div>
        )}

        {type === "login" ? (
          <p className="mt-4 text-center text-sm text-gray-500">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Cadastre-se
            </Link>
          </p>
        ) : (
          <p className="mt-4 text-center text-sm text-gray-500">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Faça login
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthForm;
