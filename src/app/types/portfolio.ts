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
  location: string;
  workType: string;
  start: string;
  end: string;
  startMonth: string;
  endMonth: string;
  description: string;
  descriptionJSX?: React.ReactNode; 
}
