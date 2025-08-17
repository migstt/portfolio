import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata.blogListing();

export default function BlogPostsPage() {
  const posts = getAllPosts();

  return (
    <SubpageLayout pageTitle="Blog">
      <div className="divide-y divide-border animate-slide-up-1 pt-[-4]">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block first:pb-4 not-first:py-4 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {post.readingTime} •{" "}
                  {post.date
                    ? new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Unknown date"}
                </p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SubpageLayout>
  );
}
