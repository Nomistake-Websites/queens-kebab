import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/socials";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/menu`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/qr-menu`, lastModified, changeFrequency: "weekly", priority: 0.9 },
  ];
}
