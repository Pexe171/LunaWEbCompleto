'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';

// Componente que verifica a comunicação com a API e registra o resultado no console
export default function ApiStatusLogger() {
  useEffect(() => {
    api.get('/health')
      .then(() => {
        console.log('API funcionando');
      })
      .catch((err) => {
        console.error('Erro ao comunicar com a API', err);
      });
  }, []);

  return null;
}
