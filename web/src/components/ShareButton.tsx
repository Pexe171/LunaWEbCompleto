"use client";

import { Button } from "./ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copiado para a área de transferência");
      }
    } catch (err) {
      console.error("Erro ao compartilhar", err);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleShare} aria-label="Compartilhar">
      <Share2 className="h-6 w-6" />
    </Button>
  );
}
