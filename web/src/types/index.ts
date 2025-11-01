import { z } from "zod";
import { loginSchema, registerSchema } from "@/lib/validators";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

export interface User {
  email: string;
  role: 'user' | 'admin';
  name?: string;
  bio?: string;
}

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: UseMutateAsyncFunction<any, Error, LoginData, unknown>;
  register: UseMutateAsyncFunction<any, Error, RegisterData, unknown>;
  logout: UseMutateAsyncFunction<void, Error, void, unknown>;
}

export interface Image {
  _id: string;
  title: string;
  url?: string;
  fileId?: string;
  videoUrl?: string;
  description?: string;
  artist?: string;
  technique?: string;
  width?: number;
  height?: number;
  tags?: string[];
  likes?: number;
  signature: string;
  certificateUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  moderationNotes?: string;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  submittedBy?: string | null;
  createdAt: string;
}

export interface Artist {
  _id: string;
  name: string;
  bio: string;
  avatarUrl: string;
}
