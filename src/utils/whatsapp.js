import { siteConfig } from "../data/siteData";

export function createWhatsAppLink(message = "") {
  const baseUrl = `https://wa.me/${siteConfig.phoneRaw}`;

  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}