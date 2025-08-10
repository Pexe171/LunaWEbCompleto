"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "./ui/input";

interface CommentsProps {
  imageId: string;
}

export default function Comments({ imageId }: CommentsProps) {
  const { isAuthenticated, isLicensed } = useAuth();
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const { data } = useQuery({
    queryKey: ['comments', imageId],
    queryFn: () => api.get(`/gallery/${imageId}/comments`).then(res => res.data),
  });

  const mutation = useMutation({
    mutationFn: () => api.post(`/gallery/${imageId}/comments`, { text }),
    onSuccess: () => {
      setText("");
      queryClient.invalidateQueries({ queryKey: ['comments', imageId] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    mutation.mutate();
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <ul className="max-h-48 overflow-y-auto space-y-1">
        {data?.map((c: any) => (
          <li key={c._id} className="text-sm"><strong>{c.userId?.name || c.userId?.email}:</strong> {c.text}</li>
        ))}
      </ul>
      {isAuthenticated && isLicensed && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Comente" />
        </form>
      )}
    </div>
  );
}
