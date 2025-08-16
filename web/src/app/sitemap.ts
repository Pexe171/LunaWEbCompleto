import { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/login`, lastModified: new Date() },
    { url: `${base}/register`, lastModified: new Date() },
    { url: `${base}/sobre`, lastModified: new Date() },
    { url: `${base}/contato`, lastModified: new Date() },
    { url: `${base}/politica-de-privacidade`, lastModified: new Date() },
  ];
}
