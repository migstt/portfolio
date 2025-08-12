import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export default function ProjectsPage() {
  const posts = getAllPosts();

  return (
    <SubpageLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.slug} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-gray-500">
              {post.readingTime} •{" "}
              {post.date
                ? new Date(post.date).toLocaleDateString()
                : "Unknown date"}
            </p>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </SubpageLayout>
  );
}
