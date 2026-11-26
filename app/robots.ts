import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://www.janul-samaranayake.me/sitemap.xml",
    host: "https://www.janul-samaranayake.me",
  };
}
