import {useState,useEffect} from 'react';
import { motion } from "framer-motion";
import { SectionWrapper } from "../components/ui/hoc";
import Link from '../components/ui/Link';
import { ChevronLeft, ChevronRight, ExternalLink} from "lucide-react";
import {useTranslation} from 'react-i18next';
import {ProjectLanguage,ProjectProps} from '../interfaces'



interface propsProjectCardDetail extends ProjectProps {
  index:number;
}

const ProjectCardDetail = (props:propsProjectCardDetail) => {
  const { index,id,project, logo, description, link,languages } = props 
  const {t} = useTranslation();
  const [OpenCard,setOpenCard] = useState<boolean>(false);

  const handleMouseEnter = () =>{
    setOpenCard(true);
  }

  const handleMouseLeave = () => {
    setOpenCard(false);

  }

  return (
    <motion.div 
      key={index+"_"+id}
      initial={{ x: "100%", y:0, opacity: 0 }}
      transition={{type:"tween", duration:1,delay:0.4,ease:"easeOut"}}
      animate={{ x: 0, y:0,opacity: 1 }}
      exit={{ x: "-100%",y:0, opacity: 0 }}
      className="w-full lg:w-1/3 h-auto sm:h-full flex flex-col items-center justify-center relative" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`w-full bg-primary flex flex-col justify-center items-center shadow-cardlight  ${OpenCard ? "translate-y-[0px] h-[150px] sm:h-[200px]" :"h-[350px] sm:h-[300px] translate-y-[150px]"} duration-700 ease-in-out z-[10] gap-2`}>
        <h1 className="font-heading text-white">{project}</h1>
        <img
          src={logo}
          className='relative w-[100px] h-[100px] object-cover rounded-full'
        />
      </div>
      <div className={`w-full bg-white flex flex-col justify-center items-center shadow-cardlight ${OpenCard ? "translate-y-[0px] h-[300px]" :"h-[250px] sm:h-[300px] translate-y-[-150px]"} duration-700 ease-in-out p-4 gap-4`}>
        <p className="text-justify text-[11px] sm:text-[14px] lg:text-[12px] text-primary lg:leading-[15px]">{description}</p>
        <div className="flex flex-start w-full h-auto">
          <Link size="sm" href={link} target="_blank" className="px-4">{t("Go To")} <ExternalLink className="h-3 w-3 sm:h-5 sm:w-5"/></Link>
        </div>
        <div className="flex flex-start flex-wrap w-full h-auto gap-2">
          {languages.map((language,index)=>(
            <span key={"languages_"+index} className="shadow-cardlight rounded-full bg-white px-2 text-[10px] hover:translate-y-[-5px] ease-in-out duration-300">#{language}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

interface ProjectCompProps {
  projects: ProjectLanguage[];
}

const Projects = (props:ProjectCompProps) => {
  const {projects} = props;
  const {i18n} = useTranslation();

  const [numberCards,setNumberCards] = useState<number>(3);
  const [currentIndex,setCurrentIndex] = useState<number>(0);
  const [ProjectsData,setProjectsData] = useState<ProjectProps[]>([]);
  const [ShowData,setShowData] = useState<ProjectProps[]>([]);

  useEffect(()=>{
    if(projects && projects.length > 0){
      const languageProduct = projects.find(item => item.language === i18n.language);
      if(languageProduct){
        // order every item of content by property id from greatest to lower
        setProjectsData(languageProduct.content.sort((a, b) => b.id - a.id));
      }
    }
  },[i18n.language])

  // New function to update the number of cards based on screen width
  const updateNumberCards = () => {
    if (window.innerWidth <= 480) {
      setNumberCards(1);
    } else if(window.innerWidth <= 820) {
      setNumberCards(1);
    }else {
      setNumberCards(3);
    }
  };

  // Call updateNumberCards on initial render and on window resize
  useEffect(() => {
    updateNumberCards();
    window.addEventListener('resize', updateNumberCards);
    return () => {
      window.removeEventListener('resize', updateNumberCards);
    };
  }, []);

  useEffect(()=>{
    if(ProjectsData && ProjectsData.length > 0){
      setShowData(ProjectsData.slice(currentIndex,currentIndex+numberCards));
    }
  },[ProjectsData,currentIndex,numberCards])


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const remainingItems = ProjectsData.length - prevIndex - numberCards;
      let newIndex = prevIndex + numberCards;

      if(remainingItems > numberCards){
        setShowData(ProjectsData.slice(newIndex, newIndex + numberCards));
      }else if (remainingItems > 0) {
        setShowData(ProjectsData.slice(newIndex));
      }else{
        newIndex = prevIndex;
      }
      return newIndex;
    });
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - numberCards >= 0 ? prevIndex - numberCards : prevIndex
    );
  };

  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row items-center gap-0 sm:gap-4 overflow-hidden">
        <ChevronLeft className="hidden md:flex h-16 w-16 hover:translate-x-[-10px] ease-in-out duration-500 cursor-pointer" onClick={()=>previousSlide()}/>
        <motion.div
          className="w-full h-[650px] sm:h-[700px] flex flex-row  justify-center items-center p-4 relative gap-4">
          {ShowData.length > 0 && ShowData.map((project, index) => (
            <ProjectCardDetail
              key={"ProjectCard_" + index}
              index={index}
              {...project}
            />
          ))}
        </motion.div>
        <ChevronRight className="relative bottom-10 hidden md:flex h-16 w-16 hover:translate-x-[10px] ease-in-out duration-500 cursor-pointer" onClick={()=>nextSlide()} />
        <div className="flex flex-row justify-center items-center gap-4 md:hidden">
          <ChevronLeft className="flex h-16 w-16 hover:translate-y-[-20px] ease-in-out duration-500 cursor-pointer" onClick={()=>previousSlide()}/>
          <ChevronRight className="flex h-16 w-16 hover:translate-y-[-20px] ease-in-out duration-500 cursor-pointer" onClick={()=>nextSlide()} />
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "projects");
