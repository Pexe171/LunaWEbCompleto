import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveAssetUrl(pathname: string) {
  if (!pathname) return "";
  // Prevent double-prefixing when an absolute URL is provided
  if (/^https?:\/\//.test(pathname)) {
    return pathname;
  }
  const isServer = typeof window === "undefined";
  const internal =
    process.env.ASSET_BASE_URL_INTERNAL ||
    process.env.NEXT_PUBLIC_ASSET_BASE_URL || // fallback
    "http://api:3333";
  const publicBase =
    process.env.NEXT_PUBLIC_ASSET_BASE_URL ||
    "http://localhost:3333";
  const base = isServer ? internal : publicBase;
  return `${base}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}
    