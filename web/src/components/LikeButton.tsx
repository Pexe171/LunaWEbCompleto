"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  imageId: string;
  initialCount?: number;
}

export default function LikeButton({ imageId, initialCount = 0 }: LikeButtonProps) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const likeMutation = useMutation({
    mutationFn: () => api.post(`/gallery/${imageId}/like`),
    onSuccess: () => {
      setCount((c) => c + 1);
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast({
        title: "Sucesso!",
        description: "Imagem curtida com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao curtir",
        description: "Você não tem permissão para curtir.",
        variant: "destructive",
      });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => api.delete(`/gallery/${imageId}/like`),
    onSuccess: () => {
      setCount((c) => Math.max(0, c - 1));
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });

  if (!isAuthenticated) {
    return null;
  }

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (liked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
    setLiked(!liked);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className="bg-transparent hover:bg-soft/20 flex items-center gap-1"
    >
      <Heart
        className={cn(
          "h-6 w-6 transition-transform",
          liked ? "text-red-500 fill-red-500 scale-110" : "text-soft"
        )}
        fill={liked ? "currentColor" : "none"}
      />
      <span className="text-soft text-sm">{count}</span>
    </Button>
  );
}
