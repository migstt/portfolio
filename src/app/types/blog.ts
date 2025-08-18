export type FrontMatter = {
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
