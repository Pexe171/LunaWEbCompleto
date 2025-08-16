"use client";

import ErrorMessage from "@/components/ErrorMessage";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 text-center space-y-4">
      <ErrorMessage message="Ocorreu um erro inesperado." />
      <button onClick={reset} className="underline">
        Tentar novamente
      </button>
    </div>
  );
}
