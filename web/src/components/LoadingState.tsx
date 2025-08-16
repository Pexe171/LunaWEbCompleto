'use client';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Carregando...' }: LoadingStateProps) {
  return <p className="py-8 text-center">{message}</p>;
}
