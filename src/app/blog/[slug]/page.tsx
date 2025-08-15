import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await Promise.resolve(getAllPosts());
  return posts.map((post) => ({ slug: post.slug }));
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

          <article
            className="
              prose prose-base prose-stone dark:prose-invert
              prose-p:leading-5
              prose-li:leading-5
              prose-blockquote:leading-5
              max-w-none w-full
              prose-headings:text-foreground
              prose-p:text-foreground
              prose-strong:text-foreground
              prose-code:text-foreground
              prose-blockquote:text-foreground
              prose-li:text-foreground
              prose-a:text-primary hover:prose-a:text-primary/80
              prose-blockquote:border-l-primary
              
              prose-table:w-full prose-table:border-collapse prose-table:my-6
              prose-thead:border-b prose-thead:border-border
              prose-th:text-left prose-th:py-3 prose-th:px-4 prose-th:font-medium
              prose-th:text-sm prose-th:text-muted-foreground
              prose-td:py-3 prose-td:px-4 prose-td:text-sm
              prose-tr:border-b prose-tr:border-border last:prose-tr:border-0
              
              prose-code:before:content-none prose-code:after:content-none
              prose-code:bg-muted prose-code:py-0.5 
              prose-code:rounded prose-code:text-sm prose-code:font-mono
              
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-pre:overflow-x-auto prose-pre:rounded-lg
              prose-pre:whitespace-pre-wrap prose-pre:break-words
              
              prose-h1:text-xl sm:prose-h1:text-xl lg:prose-h1:text-3xl
              prose-h2:text-lg sm:prose-h2:text-lg lg:prose-h2:text-2xl
              prose-h3:text-base sm:prose-h3:text-base lg:prose-h3:text-xl
              prose-h4:text-sm sm:prose-h4:text-sm lg:prose-h4:text-lg
              prose-h5:text-xs sm:prose-h5:text-xs lg:prose-h5:text-base
              prose-h6:text-xs sm:prose-h6:text-xs lg:prose-h6:text-sm
              prose-h1:mt-4 prose-h2:mt-6 prose-h3:mt-5
              prose-h4:mt-4 prose-h5:mt-4 prose-h6:mt-4
              mb-12
            "
            dangerouslySetInnerHTML={{
              __html: `
                ${
                  post.description
                    ? `<p class="mt-4">${post.description}</p>`
                    : ""
                }
                ${post.contentHtml}
              `,
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
