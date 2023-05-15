import {ClassValue,clsx} from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  WebData,
  webContentLanguage,
  WebContentProps,
  ExperienceLanguage,
  ExperienceProps,
  ProjectLanguage,
  ProjectProps,
  SkillLanguage,
  SkillProps,
  BookLanguage,
  BookProps
} from "../interfaces"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


let wrapper: HTMLElement | null = null;
const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))

export async function writingAll(words:string[], container:string) {
  wrapper = document.getElementById(container);
  const strings = words;
  await loopThroughStrings(strings);
};

async function loopThroughStrings(strings:string[], currentIndex = 0) {
  if (currentIndex >= strings.length) {
    currentIndex = 0;
  }

  await write(strings[currentIndex]);
  await sleep(1500);
  await erase();
  await sleep(1500);

  await loopThroughStrings(strings, currentIndex + 1);
}

async function write(text:string) {
  let index = 0
  while (index < text.length) {
    const timeout = 100
    await sleep(timeout)
    index++
    if (wrapper) {
      wrapper.innerHTML = text.substring(0, index);
    }
  }
};


async function erase() {
  while (wrapper && wrapper.textContent && wrapper.textContent.length) {
    const timeout = 100
    await sleep(timeout)
    if (wrapper.textContent) {
      wrapper.textContent = wrapper.textContent.substring(0, wrapper.textContent.length - 2);
    }
  }
};


export function generatePoints(viewWidth:number, viewHeight:number, numPoints:number) {
  const points = [];
  const cellSize = 50; // adjust this value to control point density
  const marginW = 0.1; 
  const marginH = 0.1; // 5% margin
  const width = viewWidth * (1 - marginW * 2);
  const height = viewHeight * (1 - marginH * 2);
  const gridWidth = Math.ceil(width / cellSize);
  const gridHeight = Math.ceil(height / cellSize);
  const grid = [];
  var delay = 200;


  const descriptionWidth = viewWidth > 480 ? 240 : 200;
  const descriptionHeight = 300;
  for (let i = 0; i < gridWidth; i++) {
    grid[i] = new Array(gridHeight).fill(null);
  }

  for (let i = 0; i < numPoints; i++) {
    let x, y;

    do {
      x = Math.floor(Math.random() * gridWidth);
      y = Math.floor(Math.random() * gridHeight);
    } while (grid[x][y] != null);

    // Scale the point coordinates and add the margin

    var objectWidth = viewWidth > 480 ? 100 : 50;//Math.floor(150 * getRandomArbitrary(0.7, 1));
    var objectHeight = objectWidth;

    const scaledX = (x * cellSize + cellSize / 2) * (1 + marginW * 2) - marginW * viewWidth;
    const scaledY = (y * cellSize + cellSize / 2) * (1 + marginH * 2) - marginH * viewHeight;

    // Make sure the object fits within the viewport
    var object_x_pos = Math.max(objectWidth / 2, Math.min(scaledX, viewWidth - objectWidth / 2));
    var object_y_pos = Math.max(objectHeight / 2, Math.min(scaledY, viewHeight - objectHeight / 2));

    var description_x_post = (object_x_pos + objectWidth + descriptionWidth) > viewWidth ? -descriptionWidth : objectWidth;
    var diffHeight = descriptionHeight - (objectHeight) + 50;
    var description_y_post = (object_y_pos + objectHeight + descriptionHeight) > viewHeight ? -diffHeight : 0;

    object_x_pos = Math.floor(object_x_pos);
    object_y_pos = Math.floor(object_y_pos);
    delay = delay + 200;

    grid[x][y] = {
      wE: objectWidth,
      hE: objectHeight,
      lE: object_x_pos,
      tE: object_y_pos,
      lD: description_x_post,
      tD: description_y_post,
      wD: descriptionWidth,
      hD: descriptionHeight,
      delay: delay
    };
    points.push(grid[x][y]);
  }
  return points; 
}

export function mapInputData(data: any):WebData {


  console.log(data.webContent);
  data.webContent       = mapWebContent(data.webContent);
  data.experiences      = mapExperiences(data.experiences);
  data.projects         = mapProjects(data.projects);
  data.skills           = mapSkills(data.skills);
  data.books            = mapBooks(data.books);

  return data;
}


const mapWebContent = (webContent:any):webContentLanguage[] => {

  var webContentSpanish:WebContentProps[] = []
  var webContentEnglish:WebContentProps[] = []
  var webContentItalian:WebContentProps[] = []

  webContent.map((item:any) => {
       webContentSpanish.push({
          id: item.id,
          name: item.name,
          content: item.content_es,
       });
       webContentEnglish.push({
         id: item.id,
         name: item.name,
         content: item.content_en,
       });

       webContentItalian.push({
         id: item.id,
         name: item.name,
         content: item.content_it,
       });
  })

  var webContentLan:webContentLanguage[] = [
    { language: 'es', content: webContentSpanish }, 
    { language: 'en', content: webContentEnglish},
    { language: 'it', content:  webContentItalian}
  ];

  return  webContentLan;
}

const mapExperiences = (experiences:any):ExperienceLanguage[] => {
  var ExperiencesSpanish:ExperienceProps[] = [];
  var ExperiencesEnglish:ExperienceProps[] = [];
  var ExperiencesItalian: ExperienceProps[] = [];

  experiences.map((experience:any)=>{

    var experienceItemEs:ExperienceProps = {
      id: experience.id,
      job: experience.job_es,
      company: experience.company,
      details: [],
      startDate: experience.startDate.split(" ")[0],
      endDate: experience.endDate.split(" ")[0],
      images:[]
    }
    var experienceItemEn:ExperienceProps = {
      id: experience.id,
      job: experience.job_en,
      company: experience.company,
      details: [],
      startDate: experience.startDate.split(" ")[0],
      endDate: experience.endDate.split(" ")[0],
      images:[]
    }

    var experienceItemIt:ExperienceProps =  {
      id: experience.id,
      job: experience.job_it,
      company: experience.company,
      details: [],
      startDate: experience.startDate.split(" ")[0],
      endDate: experience.endDate.split(" ")[0],
      images:[]
    }

    try {
      experienceItemEs.details = JSON.parse(experience.details_es);
    } catch (error) {
      experienceItemEs.details = [];
    }

    try {
      experienceItemEn.details = JSON.parse(experience.details_en);
    } catch (error) {
      experienceItemEn.details = [];
    }

    try {
      experienceItemIt.details = JSON.parse(experience.details_it);
    } catch (error) {
      experienceItemIt.details = [];
    }

    if(experience.image1 !== "N/A"){
      experienceItemEn.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image1)
      experienceItemEs.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image1)
      experienceItemIt.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image1)
    }
    if(experience.image2 !== "N/A"){
      experienceItemEs.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image2)
      experienceItemEn.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image2)
      experienceItemIt.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image2)
    }
    if(experience.image3 !== "N/A"){
      experienceItemEs.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image3)
      experienceItemEn.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image3)
      experienceItemIt.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image3)
    }
    if(experience.image4 !== "N/A"){
      experienceItemEs.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image4)
      experienceItemEn.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image4)
      experienceItemIt.images.push(import.meta.env.VITE_BACKEND_URL_PUBLIC+experience.image4)
    }

    ExperiencesSpanish.push(experienceItemEs);
    ExperiencesEnglish.push(experienceItemEn);
    ExperiencesItalian.push(experienceItemIt);

  })

  var ExperiencesLan:ExperienceLanguage[] = [
    { language: 'es', content: ExperiencesSpanish }, 
    { language: 'en', content: ExperiencesEnglish},
    { language: 'it', content: ExperiencesItalian}
  ]
  return ExperiencesLan; 
}


const mapProjects = (projects:any):ProjectLanguage[] => {
  var ProjectsSpanish:ProjectProps[] = [];
  var ProjectsEnglish:ProjectProps[] = [];
  var ProjectsItalian: ProjectProps[] = [];

  projects.map((project:any)=>{
    var projectItemEs:ProjectProps = {
      id: project.id,
      project: project.project,
      logo: import.meta.env.VITE_BACKEND_URL_PUBLIC+project.logo,
      description: project.description_es,
      link: project.link,
      languages: [],
    }
    var projectItemEn:ProjectProps = {
      id: project.id,
      project: project.project,
      logo: import.meta.env.VITE_BACKEND_URL_PUBLIC+project.logo,
      description: project.description_en,
      link: project.link,
      languages: [],
    }

    var projectItemIt:ProjectProps = {
      id: project.id,
      project: project.project,
      logo: import.meta.env.VITE_BACKEND_URL_PUBLIC+project.logo,
      description: project.description_it,
      link: project.link,
      languages: [],
    }

    try {
      projectItemEs.languages = JSON.parse(project.languages);
      projectItemEn.languages = JSON.parse(project.languages);
      projectItemIt.languages = JSON.parse(project.languages);
    } catch (error) {
      projectItemEs.languages = [];
      projectItemEn.languages = [];
      projectItemIt.languages = [];
    }

    ProjectsSpanish.push(projectItemEs);
    ProjectsEnglish.push(projectItemEn);
    ProjectsItalian.push(projectItemIt);

  })

  var ProjectsLan:ProjectLanguage[] = [
    { language: 'es', content: ProjectsSpanish }, 
    { language: 'en', content: ProjectsEnglish},
    { language: 'it', content: ProjectsItalian}
  ]
  return ProjectsLan; 
}


const mapSkills = (skills:any):SkillLanguage[] => {
  var SkillsSpanish:SkillProps[] = [];
  var SkillsEnglish:SkillProps[] = [];
  var SkillsItalian: SkillProps[] = [];

  skills.map((skill:any)=>{
    var skillItemEs:SkillProps = {
      id: skill.id,
      title: skill.title,
      image: import.meta.env.VITE_BACKEND_URL_PUBLIC+skill.image,
      description: skill.description_es,
      keywords: [],
    }
    var skillItemEn:SkillProps = {
      id: skill.id,
      title: skill.title,
      image: import.meta.env.VITE_BACKEND_URL_PUBLIC+skill.image,
      description: skill.description_en,
      keywords: [],
    }

    var skillItemIt:SkillProps = {
      id: skill.id,
      title: skill.title,
      image: import.meta.env.VITE_BACKEND_URL_PUBLIC+skill.image,
      description: skill.description_it,
      keywords: [],
    }

    try {
      skillItemEs.keywords = JSON.parse(skill.keywords);
      skillItemEn.keywords = JSON.parse(skill.keywords);
      skillItemIt.keywords = JSON.parse(skill.keywords);
    } catch (error) {
      skillItemEs.keywords = [];
      skillItemEn.keywords = [];
      skillItemIt.keywords = [];
    }

    SkillsSpanish.push(skillItemEs);
    SkillsEnglish.push(skillItemEn);
    SkillsItalian.push(skillItemIt);

  })

  var SkillsLan:SkillLanguage[] = [
    { language: 'es', content: SkillsSpanish}, 
    { language: 'en', content: SkillsEnglish},
    { language: 'it', content: SkillsItalian}
  ]
  return SkillsLan; 
}

const mapBooks = (books:any):BookLanguage[] => {
  var BooksSpanish:BookProps[] = [];
  var BooksEnglish:BookProps[] = [];
  var BooksItalian: BookProps[] = [];

  books.map((book:any)=>{
    var bookItemEs:BookProps = {
      id: book.id,
      title: book.title,
      href: book.href,
      author: book.author,
      img: import.meta.env.VITE_BACKEND_URL_PUBLIC+book.img,
      content: book.content_es
    }
    var bookItemEn:BookProps = {
      id: book.id,
      title: book.title,
      href: book.href,
      author: book.author,
      img: import.meta.env.VITE_BACKEND_URL_PUBLIC+book.img,
      content: book.content_en
    }

    var bookItemIt:BookProps = {
      id: book.id,
      title: book.title,
      href: book.href,
      author: book.author,
      img: import.meta.env.VITE_BACKEND_URL_PUBLIC+book.img,
      content: book.content_it
    }

    BooksSpanish.push(bookItemEs);
    BooksEnglish.push(bookItemEn);
    BooksItalian.push(bookItemIt);

  })

  var BooksLan:BookLanguage[] = [
    { language: 'es', content: BooksSpanish}, 
    { language: 'en', content: BooksEnglish},
    { language: 'it', content: BooksItalian}
  ]
  return BooksLan; 
}










