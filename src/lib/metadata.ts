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
}

export interface MetadataConfig {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultAuthor: string;
  siteUrl: string;
  twitterHandle?: string;
}

export const metadataConfig: MetadataConfig = {
  siteName: "Miguel Franco Trinidad",
  defaultTitle: "Miguel Franco Trinidad",
  defaultDescription:
    "Building websites and exploring DevOps",
  defaultAuthor: "Miguel Franco Trinidad",
  siteUrl: "https://migueltrinidad.com",
  twitterHandle: "@yourtwitterhandle",
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
  } = pageData;

  const {
    siteName,
    defaultDescription,
    defaultAuthor,
    siteUrl,
    twitterHandle,
  } = config;

  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const metaDescription = description || defaultDescription;
  const metaAuthor = author || defaultAuthor;

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
    },

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
}): Metadata {
  return generatePageMetadata({
    title: post.title,
    description: post.description,
    publishedTime: post.date,
    section: "Blog",
    tags: post.tags,
  });
}

export function generateBlogListingMetadata(): Metadata {
  return generatePageMetadata({
    title: "Blog",
    description:
      "Latest articles on web development, DevOps, and tech insights by Miguel Franco Trinidad.",
    section: "Blog",
  });
}
