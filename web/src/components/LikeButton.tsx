"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

interface LikeButtonProps {
  imageId: string;
}

export default function LikeButton({ imageId }: LikeButtonProps) {
  const { isLicensed, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);

  const likeMutation = useMutation({
    mutationFn: () =>
      liked ? api.delete(`/gallery/${imageId}/like`) : api.post(`/gallery/${imageId}/like`),
    onSuccess: () => {
      setLiked(!liked);
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o like.",
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
      <Heart className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
    </Button>
  );
}
