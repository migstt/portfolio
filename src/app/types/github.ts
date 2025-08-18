export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
};

export type ProcessedRepo = {
  id: number;
  name: string;
  displayName: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  createdAt: string;
};

export interface DetailedRepo extends ProcessedRepo {
  readme?: string;
  hasReadme: boolean;
}
