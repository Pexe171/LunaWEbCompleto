"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { imageSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      title: "",
      url: "",
      tags: "",
      description: "",
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (data: z.infer<typeof imageSchema>) => {
      return api.post('/gallery', {
        title: data.title,
        url: data.url,
        tags: data.tags ?? '',
        description: data.description ?? '',
      });
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Imagem carregada com sucesso.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      form.reset();
      router.push('/');
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao carregar imagem",
        description: error.response?.data?.message || "Ocorreu um erro.",
        variant: "destructive",
      });
    }
  });

  function onSubmit(values: z.infer<typeof imageSchema>) {
    uploadMutation.mutate(values);
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Carregar Nova Imagem</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título da imagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Imagem</FormLabel>
                <FormControl>
                  <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="ex: natureza, cidade, arte (separadas por vírgula)" {...field} />
                </FormControl>
                <FormDescription>Separe as tags por vírgula.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Conte a história desta imagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={uploadMutation.isPending}>
            {uploadMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Carregar Imagem
          </Button>
        </form>
      </Form>
    </div>
  );
}
