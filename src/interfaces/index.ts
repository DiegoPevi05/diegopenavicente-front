export interface WebData {
  webContent: webContentLanguage[];
  experiences: ExperienceLanguage[];
  projects: ProjectLanguage[];
  skills:SkillLanguage[];
  books:BookLanguage[];
  myfyp:MyFYPProps[];
}

export interface webContentLanguage {
  language: string;
  content: WebContentProps[];
}
export interface WebContentProps {
  id:string; 
  name:string;
  content:string;
}

export interface MyFYPProps{
  id:string;
  name:string;
  link:string;
  icon:string;
}

export interface ExperienceLanguage {
  language: string;
  content:  ExperienceProps[];
}

export interface ExperienceProps {
  id:number;
  job:string;
  company:string;
  details:string[];
  startDate:string;
  endDate:string;
  images:string[];
}

export interface ProjectLanguage {
  language: string;
  content: ProjectProps[];
}

export interface ProjectProps {
  id:number;
  project:string;
  logo:string;
  description:string;
  link:string;
  github:string;
  languages:{id:number; title:string }[];
}


export interface SkillLanguage{
  language:string;
  content:SkillProps[];
}

export interface SkillProps{
  id:number;
  title:string;
  description:string;
  keywords:string[];
  image:string;
}

export interface BookLanguage{
  language:string;
  content:BookProps[];
}

export interface BookProps{
  id:number;
  type:string;
  img:string;
  href:string;
  title:string;
  author:string;
  content:string;
}

