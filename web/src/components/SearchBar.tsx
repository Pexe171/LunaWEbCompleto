"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Input } from "./ui/input";
import { Image } from "@/types";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const { data } = useQuery<Image[]>({
    queryKey: ['search', query],
    queryFn: () => api.get(`/gallery?search=${query}`).then(res => res.data.images),
    enabled: query.length > 2
  });

  const suggestions = Array.from(new Set([
    ...(data?.map(img => img.title) || []),
    ...(data?.map(img => img.authorName) || [])
  ])).slice(0,5);

  const handleSelect = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-md relative">
      <form onSubmit={handleSubmit}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título ou autor"
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
          {suggestions.map((s) => (
            <li key={s} className="p-2 hover:bg-accent-secondary cursor-pointer" onClick={() => handleSelect(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
