import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Notebook } from "lucide-react";
import { SeemoreButton } from "@/components/general/SeemoreButton";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";

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
            href={`/blog/${post.slug}/`}
            className="block group"
          >
            <div className="flex gap-3">
              {/* Image - Left Side */}
              {post.image && (
                <div className="w-20 h-16 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content - Right Side */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                  {post.description}
                </p>

                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>{post.readingTime}</span>
                  {post.date && (
                    <>
                      <span className="mx-2">•</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
