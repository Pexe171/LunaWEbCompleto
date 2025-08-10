"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "./ui/use-toast";

interface LikeButtonProps {
  imageId: string;
}

export default function LikeButton({ imageId }: LikeButtonProps) {
  const { isLicensed, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Implementação otimista de likes. Você precisaria de um endpoint para likes/unlikes.
  // Aqui, apenas um mock para demonstrar a interação.
  const likeMutation = useMutation({
    mutationFn: () => api.post(`/gallery/${imageId}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast({
        title: "Sucesso!",
        description: "Imagem curtida com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao curtir",
        description: "Você não tem permissão para curtir ou a licença expirou.",
        variant: "destructive",
      });
    }
  });

  if (!isAuthenticated || !isLicensed) {
    return null;
  }

  const handleLike = () => {
    likeMutation.mutate();
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleLike} className="bg-white/50 hover:bg-white">
      <Heart className="h-6 w-6 text-red-500" />
    </Button>
  );
}
