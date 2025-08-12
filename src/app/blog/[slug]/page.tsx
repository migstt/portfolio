import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

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
    <article>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">
        {post.readingTime} •{" "}
        {post.date ? new Date(post.date).toLocaleDateString() : "Unknown date"}
      </p>
      <div
        className="prose prose-lg mt-6"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="mt-8 flex justify-between">
        {prevPost && (
          <Link href={`/blog/${prevPost.slug}`} className="text-blue-500">
            ← {prevPost.title}
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="text-blue-500 ml-auto"
          >
            {nextPost.title} →
          </Link>
        )}
      </div>
    </article>
  );
}
