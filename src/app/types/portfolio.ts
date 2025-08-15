export interface Profile {
  name: string;
  verified: boolean;
  location: string;
  role: string;
  profileImage: string;
  achievement: string;
}

export type AboutText = string;

export interface TechCategory {
  label: string;
  items: string[];
}

export interface Experience {
  title: string;
  company: string;
  start: string;
  end: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
}
