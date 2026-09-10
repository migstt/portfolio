"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/app/types";

function formatDate(date: string | null) {
  if (!date) return "Unknown date";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostList({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [posts]);

  const visible = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  return (
    <div className="flex flex-col gap-6 animate-slide-up-1">
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className="cursor-pointer"
          >
            <Badge
              variant={activeTag === null ? "default" : "secondary"}
              className="font-normal"
            >
              All {posts.length}
            </Badge>
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              aria-pressed={tag === activeTag}
              className="cursor-pointer"
            >
              <Badge
                variant={tag === activeTag ? "default" : "secondary"}
                className="font-normal"
              >
                {tag}
              </Badge>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {visible.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`} className="group">
            <div className="flex overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5">
              {post.image && (
                <div className="hidden sm:block relative w-48 md:w-56 flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1 p-5">
                <h2 className="font-sans text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                </div>

                <p className="font-sans text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="font-sans text-sm text-muted-foreground py-8 text-center">
          Nothing tagged {activeTag} yet.
        </p>
      )}
    </div>
  );
}
