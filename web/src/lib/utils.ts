import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ResolveAssetOptions = {
  /**
   * When `true`, uses the internal base URL intended for server side
   * requests (e.g. when running inside Docker containers).
   * Defaults to `false` which returns the public base URL used by the
   * browser.
   */
  internal?: boolean;
};

export function resolveAssetUrl(pathname: string, opts: ResolveAssetOptions = {}) {
  if (!pathname) return "";
  // Prevent double-prefixing when an absolute URL is provided
  if (/^https?:\/\//.test(pathname)) {
    return pathname;
  }
  const internalBase =
    process.env.ASSET_BASE_URL_INTERNAL ||
    process.env.NEXT_PUBLIC_ASSET_BASE_URL || // fallback
    "http://api:3333";
  const publicBase =
    process.env.NEXT_PUBLIC_ASSET_BASE_URL ||
    "http://localhost:3333";
  const base = opts.internal ? internalBase : publicBase;
  return `${base}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}
    