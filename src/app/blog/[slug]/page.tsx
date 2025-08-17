import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";
import Article from "@/components/general/Article";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await Promise.resolve(getAllPosts());
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return createPageMetadata.notFound(`/blog/${slug}`);
  }

  return createPageMetadata.blogPost({
    title: post.title,
    description: post.description,
    slug,
    date: post.date || undefined,
    tags: post.tags,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = await Promise.resolve(getAllPosts());
  const index = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = index < allPosts.length - 1 ? allPosts[index + 1] : null;
  const nextPost = index > 0 ? allPosts[index - 1] : null;

  return (
    <SubpageLayout pageTitle={post.title}>
      <div className="animate-slide-up-1 w-full">
        <div className="w-full max-w-none">
          <header>
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-2 leading-tight text-foreground">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {post.date
                    ? new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Unknown date"}
                </span>
              </div>
            </div>
          </header>

          <Article
            post={{
              description: post.description,
              contentHtml: post.contentHtml,
            }}
          />

          {(prevPost || nextPost) && (
            <nav className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-row justify-between items-center gap-4">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-1 max-w-[45%] py-2"
                  >
                    <ChevronLeft className="h-4 w-4 flex-shrink-0 group-hover:-translate-x-0.5 transition-transform duration-200" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors lg:hidden">
                        Previous Post
                      </p>
                      <div className="hidden lg:block">
                        <p className="text-xs uppercase tracking-wide font-medium">
                          Previous
                        </p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                          {prevPost.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1 max-w-[45%]"></div>
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-1 max-w-[45%] py-2 justify-end"
                  >
                    <div className="min-w-0 flex-1 text-right order-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors lg:hidden">
                        Next Post
                      </p>
                      <div className="hidden lg:block">
                        <p className="text-xs uppercase tracking-wide font-medium">
                          Next
                        </p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                          {nextPost.title}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200 order-2" />
                  </Link>
                ) : (
                  <div className="flex-1 max-w-[45%]"></div>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    </SubpageLayout>
  );
}
