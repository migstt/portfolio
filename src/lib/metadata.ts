import { Metadata } from "next";

export interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
}

export interface MetadataConfig {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultAuthor: string;
  siteUrl: string;
  twitterHandle?: string;
  defaultImage: string;
  defaultImageAlt: string;
}

export const metadataConfig: MetadataConfig = {
  siteName: "Miguel Franco Trinidad",
  defaultTitle: "Miguel Franco Trinidad",
  defaultDescription:
    "Full-stack web developer with experience in PHP and JavaScript, actively exploring DevOps.",
  defaultAuthor: "Miguel Franco Trinidad",
  siteUrl: "https://migueltrinidad.com",
  twitterHandle: "@yourtwitterhandle",
  defaultImage: "https://migueltrinidad.com/og-image.jpg",
  defaultImageAlt:
    "Miguel Franco Trinidad - Full Stack Developer"
};

export function generatePageMetadata(
  pageData: PageMetadata,
  config: MetadataConfig = metadataConfig
): Metadata {
  const {
    title,
    description,
    keywords,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    image,
  } = pageData;

  const {
    siteName,
    defaultDescription,
    defaultAuthor,
    siteUrl,
    twitterHandle,
    defaultImage,
  } = config;

  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const metaDescription = description || defaultDescription;
  const metaAuthor = author || defaultAuthor;
  const metaImage = image || defaultImage;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: keywords?.join(", "),
    authors: [{ name: metaAuthor }],
    creator: metaAuthor,
    publisher: siteName,

    openGraph: {
      title: fullTitle,
      description: metaDescription,
      siteName,
      locale: "en_US",
      type: publishedTime ? "article" : "website",
      url: siteUrl,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && {
        publishedTime,
        modifiedTime,
        section,
        tags,
        authors: [metaAuthor],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      creator: twitterHandle,
      images: [metaImage],
    },

    alternates: {
      canonical: siteUrl,
    },

    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: "/apple-touch-icon.png",
    },

    manifest: "/site.webmanifest",

    ...(publishedTime && {
      other: {
        "article:published_time": publishedTime,
        "article:modified_time": modifiedTime || publishedTime,
        "article:author": metaAuthor,
        "article:section": section || "Blog",
        "article:tag": tags?.join(",") || "",
      },
    }),

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateBlogMetadata(post: {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  slug?: string;
  image?: string;
}): Metadata {
  return generatePageMetadata({
    title: post.title,
    description: post.description,
    publishedTime: post.date,
    section: "Blog",
    tags: post.tags,
    image: post.image,
  });
}

export function generateBlogListingMetadata(): Metadata {
  return generatePageMetadata({
    title: "Blog",
    description:
      "Articles on web development, DevOps, and tech insights.",
    section: "Blog",
  });
}
