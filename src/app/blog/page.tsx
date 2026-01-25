import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = createPageMetadata.blogListing();

export default function BlogPostsPage() {
  const posts = getAllPosts();

  return (
    <SubpageLayout pageTitle="Blog">
      <div className="flex flex-col gap-4 animate-slide-up-1">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`} className="group">
            <div className="flex overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5">
              {/* Image - Left Side */}
              {post.image && (
                <div className="hidden sm:block w-48 md:w-56 flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={224}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Content - Right Side */}
              <div className="flex-1 p-5">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date
                      ? new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Unknown date"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SubpageLayout>
  );
}
