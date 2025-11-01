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
      signature: "",
      certificateUrl: "",
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (data: z.infer<typeof imageSchema>) => {
      return api.post('/gallery', {
        title: data.title,
        url: data.url,
        tags: data.tags ?? '',
        description: data.description ?? '',
        signature: data.signature,
        certificateUrl: data.certificateUrl,
      });
    },
    onSuccess: () => {
      toast({
        title: "Envio recebido!",
        description: "Sua obra entrou na fila de curadoria humana e será avaliada em breve.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      form.reset();
      router.push('/admin/publications');
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
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Carregar Nova Imagem</h1>
        <p className="text-sm text-muted-foreground">
          Toda submissão passa por curadoria manual. Aceitamos apenas criações humanas: obras geradas por inteligência artificial não entram na nossa galeria.
        </p>
      </div>
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
          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assinatura Digital</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Informe a assinatura digital ou hash que comprove a autoria da obra"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Use um certificado, hash ou declaração única que autentique que a arte é sua criação manual.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="certificateUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link para Certificado (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://exemplo.com/certificado.pdf" {...field} />
                </FormControl>
                <FormDescription>
                  Caso possua um certificado digital de autoria, compartilhe o link aqui.
                </FormDescription>
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
