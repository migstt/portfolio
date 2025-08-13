import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { getAllPosts } from "@/lib/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function BlogPostsPage() {
  const posts = getAllPosts();

  return (
    <SubpageLayout>
      <div className="grid grid-cols-1 gap-2 animate-slide-up-1">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="group relative cursor-pointer hover:scale-[1.02] hover:shadow-lg border-border bg-card hover:bg-accent/50">
              {/* Arrow icon in top right */}
              <div className="absolute top-4 right-4 z-10">
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold group-hover:text-foreground">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {post.readingTime} •{" "}
                  {post.date
                    ? new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Unknown date"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </SubpageLayout>
  );
}
