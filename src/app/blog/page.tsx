import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = createPageMetadata.blogListing();

export default function BlogPostsPage() {
  const posts = getAllPosts();

  return (
    <SubpageLayout pageTitle="Blog">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up-1">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date
                      ? new Date(post.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Unknown date"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-3 h-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </SubpageLayout>
  );
}
