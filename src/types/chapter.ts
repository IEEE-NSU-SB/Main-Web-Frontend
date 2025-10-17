export interface AboutSection {
  title: string;
  description: string[];
}

export interface ChapterPageData {
  name?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  primaryColor?: string;
  secondaryColor?: string;
  missionVisionColor?: string;
  textColor?: string;
  logo?: string;
  parallax?: string;
  email?: string;
  fb?: string;
  about?: AboutSection[];
  mission?: string[];
  vision?: string[];
  question?: {
    "1": string[];
    "2": string[];
    "3": string[];
    "4": string[];
  }[];
}
