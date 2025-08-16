export default function Loading({ message = "Carregando...", className = "" }: { message?: string; className?: string }) {
  return (
    <div role="status" className={`text-center ${className}`}>
      {message}
    </div>
  );
}
