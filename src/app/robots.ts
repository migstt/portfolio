import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/"], // disallow any private/admin areas you want hidden
      },
      {
        userAgent: ["Bingbot", "Applebot"],
        disallow: "/", // block Bing and Apple bots entirely if you prefer
      },
    ],
    host: "https://migueltrindidad.com", // optional but good to specify your canonical host
  };
}
