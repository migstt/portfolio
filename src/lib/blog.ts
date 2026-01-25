import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { FrontMatter, Post } from "@/app/types";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

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
      image: frontmatter.image,
    };
  });

  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export type TocHeading = {
  id: string;
  text: string;
  level: number;
};

export function extractHeadings(markdown: string): TocHeading[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
  }

  return headings;
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const frontmatter = data as FrontMatter;

  const processedContent = await processMarkdown(content);
  const headings = extractHeadings(content);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: data.date ? new Date(data.date).toISOString() : null,
    readingTime: readingTime(content).text,
    contentHtml: processedContent.toString(),
    plainmd: content,
    tags: [],
    image: "",
    headings,
  };
}

export async function processMarkdown(markdown: string) {
  return await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
}
