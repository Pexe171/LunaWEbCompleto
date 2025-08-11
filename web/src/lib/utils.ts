import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveAssetUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const prefix = base ?? "";
  const separator = path.startsWith("/") ? "" : "/";
  return `${prefix}${separator}${path}`;
}
    