import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { Clock, Calendar } from "lucide-react";
import Article from "@/components/general/Article";
import PaginationNav from "@/components/general/PaginationNav";
import TableOfContents from "@/components/general/TableOfContents";

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
        <div className="lg:flex lg:gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
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

            <PaginationNav
              prevItem={prevPost}
              nextItem={nextPost}
              basePath="/blog"
              itemType="Post"
            />
          </div>

          {/* Table of Contents - right side, hidden on mobile */}
          <aside className="hidden lg:block w-72 flex-shrink-0 relative">
            <div className="sticky top-6">
              <TableOfContents headings={post.headings} />
            </div>
          </aside>
        </div>
      </div>
    </SubpageLayout>
  );
}
