import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import html from "remark-html";
import rehypePrism from "rehype-prism-plus";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

type FrontMatter = {
  title: string;
  date: string;
  description: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string | null;
  description: string;
  readingTime: string;
  content: string;
};

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);
    const frontmatter = data as FrontMatter;

    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      readingTime: readingTime(content).text,
      content,
    };
  });

  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const frontmatter = data as FrontMatter;

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(rehypePrism)
    .process(content);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: data.date ? new Date(data.date).toISOString() : null,
    readingTime: readingTime(content).text,
    contentHtml: processedContent.toString(),
  };
}
