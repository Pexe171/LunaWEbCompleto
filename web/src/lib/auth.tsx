"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from './api';
import { User, AuthContextType, LoginData, RegisterData } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  const [accessToken, setLocalAccessToken] = useState<string | null>(null);
  const [refreshToken, setLocalRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);

  useEffect(() => {
    const storedAccessToken = getAccessToken();
    const storedRefreshToken = getRefreshToken();
    if (storedAccessToken) setLocalAccessToken(storedAccessToken);
    if (storedRefreshToken) setLocalRefreshToken(storedRefreshToken);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!accessToken) {
      setUser(null);
      queryClient.setQueryData(['auth'], { user: null });
      return;
    }

    let isCurrent = true;

    const loadUser = async () => {
      setIsFetchingUser(true);
      try {
        const response = await api.get<User>('/users/me');
        if (!isCurrent) {
          return;
        }
        setUser(response.data);
        queryClient.setQueryData(['auth'], { user: response.data });
      } catch (error) {
        if (!isCurrent) {
          return;
        }
        console.error('Erro ao carregar dados do usuário autenticado.', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setLocalAccessToken(null);
        setLocalRefreshToken(null);
        setUser(null);
        queryClient.setQueryData(['auth'], { user: null });
      } finally {
        if (isCurrent) {
          setIsFetchingUser(false);
        }
      }
    };

    loadUser();

    return () => {
      isCurrent = false;
    };
  }, [accessToken, isInitialized, queryClient]);

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => api.post('/auth/login', data),
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setLocalAccessToken(res.data.accessToken);
      setLocalRefreshToken(res.data.refreshToken);
      setUser(res.data.user);
      queryClient.setQueryData(['auth'], { user: res.data.user });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => api.post('/auth/create-user', data),
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const token = getRefreshToken();
      if (token) {
        await api.post('/auth/logout', { refreshToken: token });
      }
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setLocalAccessToken(null);
      setLocalRefreshToken(null);
      setUser(null);
      queryClient.setQueryData(['auth'], { user: null });
    },
    onError: () => {
      toast({
        title: "Erro ao fazer logout",
        description: "Não foi possível invalidar a sessão no servidor, mas você foi desconectado localmente.",
        variant: "destructive",
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setLocalAccessToken(null);
      setLocalRefreshToken(null);
      setUser(null);
      queryClient.setQueryData(['auth'], { user: null });
    },
  });

  const value = {
    user,
    isAuthenticated: Boolean(accessToken && user),
    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      isFetchingUser,
    isInitialized,
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
