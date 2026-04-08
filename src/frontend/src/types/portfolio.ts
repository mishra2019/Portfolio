export type PersonalInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  /** Full URL to LeetCode profile, e.g. https://leetcode.com/u/username */
  leetcode?: string;
  website: string;
};

export type SkillCategory = {
  category: string;
  icon: string;
  skills: string[];
};

export type Experience = {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string[];
};

export type Project = {
  name: string;
  description: string;
  technologies: string[];
  link: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  description: string;
};

export type Education = {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
  cgpa: string;
  location: string;
};

export type CodingAchievement = {
  platform: string;
  rank: string;
  rating: number;
  detail: string;
  color: string;
  icon: string;
};

export type Award = {
  title: string;
  detail: string;
  icon: string;
};

export type PortfolioPayload = {
  personalInfo: PersonalInfo;
  heroRoles: string[];
  profileSummary: string;
  skillCategories: SkillCategory[];
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  codingAchievements: CodingAchievement[];
  awards: Award[];
};
