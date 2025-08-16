export default function ErrorMessage({ message = "Ocorreu um erro.", className = "" }: { message?: string; className?: string }) {
  return (
    <div role="alert" className={`text-center text-red-500 ${className}`}>
      {message}
    </div>
  );
}
