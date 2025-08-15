import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Notebook } from "lucide-react";
import { SeemoreButton } from "@/components/general/SeemoreButton";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export function TechBlog() {
  const posts = getAllPosts().slice(0, 3); // Get latest 3

  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Notebook className="w-4 h-4" />
          Tech Blog
        </CardTitle>
        <SeemoreButton href="blog" label="Tech Blog" page="blog posts" />
      </CardHeader>

      <CardContent className="flex-1 mt-1 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group hover:transform hover:scale-[1.01]"
          >
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {post.description}
              </p>

              <div className="flex items-center text-xs text-muted-foreground">
                <span>{post.readingTime}</span>
                {post.date && (
                  <>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
