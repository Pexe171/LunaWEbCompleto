import { z } from "zod";
import { loginSchema, registerSchema } from "@/lib/validators";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

export interface User {
  email: string;
  name?: string;
  bio?: string;
  licenseExpiresAt: string;
  role: 'user' | 'admin';
}

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLicensed: boolean;
  isLoading: boolean;
  login: UseMutateAsyncFunction<any, Error, LoginData, unknown>;
  register: UseMutateAsyncFunction<any, Error, RegisterData, unknown>;
  logout: UseMutateAsyncFunction<void, Error, void, unknown>;
}

export interface Image {
  _id: string;
  title: string;
  url?: string;
  fileId?: string;
  description?: string;
  artist?: string;
  technique?: string;
  width?: number;
  height?: number;
  tags?: string[];
  createdAt: string;
}

export interface Artist {
  _id: string;
  name: string;
  bio: string;
  avatarUrl: string;
}
