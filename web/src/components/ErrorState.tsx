'use client';

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({ message = 'Erro ao carregar dados.' }: ErrorStateProps) {
  return (
    <p role="alert" className="py-8 text-center text-red-600">
      {message}
    </p>
  );
}
