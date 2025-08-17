import { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Miguel Franco Trinidad",
  description:
    "Full-stack web developer with experience in PHP and JavaScript, actively exploring DevOps.",
  url: "https://migueltrinidad.com",
  author: "Miguel Franco Trinidad",
  twitter: "@mytwitterhandle",
  ogImage: "https://migueltrinidad.com/og-image.jpg",
} as const;

const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.name,
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description = SITE_CONFIG.description,
  path = "",
  image = SITE_CONFIG.ogImage,
  publishedTime,
  modifiedTime,
  tags,
  type = "website",
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const pageTitle =
    title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;

  return {
    ...BASE_METADATA,
    title: pageTitle,
    description,
    keywords: tags?.join(", "),

    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type,
      publishedTime,
      modifiedTime,
      authors: type === "article" ? [SITE_CONFIG.author] : undefined,
      tags: type === "article" ? tags : undefined,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      creator: SITE_CONFIG.twitter,
      images: [image],
    },

    alternates: {
      canonical: url,
    },

    ...(type === "article" &&
      publishedTime && {
        other: {
          "article:published_time": publishedTime,
          "article:modified_time": modifiedTime || publishedTime,
          "article:author": SITE_CONFIG.author,
          "article:tag": tags?.join(",") || "",
        },
      }),
  };
}

export const createPageMetadata = {
  blogPost: (post: {
    title: string;
    description?: string;
    slug: string;
    date?: string;
    tags?: string[];
    image?: string;
  }) =>
    createMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      image: post.image,
      publishedTime: post.date,
      tags: post.tags,
      type: "article",
    }),

  project: (project: {
    title: string;
    description?: string;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
  }) =>
    createMetadata({
      title: project.title,
      description: project.description,
      path: `/projects/${project.slug}`,
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      type: "article",
    }),

  blogListing: () =>
    createMetadata({
      title: "Blog",
      description: "Articles on web development, DevOps, and tech insights.",
      path: "/blog",
    }),

  projectListing: () =>
    createMetadata({
      title: "Projects",
      description:
        "Projects fetched from my GitHub account using the GitHub REST API.",
      path: "/projects",
    }),

  notFound: (path: string) =>
    createMetadata({
      title: "Page Not Found",
      description: "The requested page could not be found.",
      path,
    }),
};
