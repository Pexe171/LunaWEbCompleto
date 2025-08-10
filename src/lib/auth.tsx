"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from './api';
import { User, AuthContextType, LoginData, RegisterData } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token);
};

export const getRefreshToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [accessToken, setLocalAccessToken] = useState<string | null>(null);
  const [refreshToken, setLocalRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = getAccessToken();
    const storedRefreshToken = getRefreshToken();
    if (storedAccessToken) setLocalAccessToken(storedAccessToken);
    if (storedRefreshToken) setLocalRefreshToken(storedRefreshToken);
  }, []);

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => api.post('/auth/login', data),
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setLocalAccessToken(res.data.accessToken);
      setLocalRefreshToken(res.data.refreshToken);
      queryClient.setQueryData(['auth'], { user: res.data.user });
    },
    onError: (error) => {
      toast({
        title: "Erro de Login",
        description: error.response?.data?.message || "Credenciais inválidas.",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => api.post('/auth/create-user', data),
    onSuccess: () => {
      toast({
        title: "Cadastro efetuado",
        description: "Sua conta foi criada. Faça login para continuar.",
      });
      router.push('/login');
    },
    onError: (error) => {
      toast({
        title: "Erro no Cadastro",
        description: error.response?.data?.message || "Ocorreu um erro no cadastro.",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const token = getRefreshToken();
      if (token) {
        return api.post('/auth/logout', { refreshToken: token });
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setLocalAccessToken(null);
      setLocalRefreshToken(null);
      queryClient.setQueryData(['auth'], { user: null, isLicensed: false });
    },
    onError: () => {
      toast({
        title: "Erro ao fazer logout",
        description: "Não foi possível invalidar a sessão no servidor, mas você foi desconectado localmente.",
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setLocalAccessToken(null);
      setLocalRefreshToken(null);
      queryClient.setQueryData(['auth'], { user: null, isLicensed: false });
    },
  });

  const { data: licenseStatus, isLoading: isLicenseLoading } = useQuery({
    queryKey: ['license'],
    queryFn: () => api.get('/license/verify-license').then(res => res.data),
    enabled: !!accessToken,
    refetchInterval: 60 * 1000 * 5 // Refreshes license status every 5 minutes
  });

  const value = {
    user: (queryClient.getQueryData(['auth']) as { user: User | null })?.user,
    isAuthenticated: !!accessToken,
    isLicensed: licenseStatus?.valid || false,
    isLoading: loginMutation.isPending || registerMutation.isPending || isLicenseLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
