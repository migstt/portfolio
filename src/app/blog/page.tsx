import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { PostList } from "@/components/blog/PostList";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = createPageMetadata.blogListing();

export default function BlogPostsPage() {
  const posts = getAllPosts();

  return (
    <SubpageLayout pageTitle="Blog">
      <PostList posts={posts} />
    </SubpageLayout>
  );
}
