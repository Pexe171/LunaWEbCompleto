'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-4 text-center">
      <p>Ocorreu um erro.</p>
      <button className="mt-2 underline" onClick={() => reset()}>
        Tentar novamente
      </button>
    </div>
  );
}
