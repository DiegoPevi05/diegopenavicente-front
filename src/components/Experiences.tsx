import {useState,useEffect} from 'react';
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../components/ui/hoc";
import {SquareDot, ChevronLeft, ChevronRight} from "lucide-react";
import {useTranslation} from 'react-i18next';
import {ExperienceLanguage,ExperienceProps} from '../interfaces'


interface propsJobCardDetail extends ExperienceProps {
  index:number;
}

const JobCardDetail = (props:propsJobCardDetail) => {
  const { index,id,job, company, details, startDate,endDate, images } = props 

  const [selectedImage,setSelectedImage] = useState<string>(images[0]);
  const [indexImage, setIndexImage] = useState<number>(0);

  useEffect(()=>{
    setIndexImage(0);
    setSelectedImage(images[0])
  },[id,images])


  const nextImage = () => {
    setIndexImage((prevIndexImage) => prevIndexImage === images.length -1 ? 0 : prevIndexImage +1);
  }

  const previousImage = () => {
    setIndexImage((prevIndexImage) => prevIndexImage === 0 ? images.length - 1 : prevIndexImage -1);
  }

  useEffect(()=>{
    setSelectedImage(images[indexImage]);
  },[indexImage])

  return (
    <div key={"Card"+index} className="w-full h-full lg:h-[550px] flex flex-col lg:flex-row">
      <motion.div 
        key={"CardText"+index}
        initial={{ x: "-100%", y:0, opacity: 0 }}
        transition={{type:"tween", duration:0.2,delay:0.2,ease:"easeOut"}}
        animate={{ x: 0, y:0,opacity: 1 }}
        exit={{ x: "-100%",y:0, opacity: 0 }}
        className="w-full lg:w-1/2 h-[500px] sm:h-auto flex-col  justify-center items-center p-4">
        <h1 className={`${styles.sectionHeadText} hover:text-secondary`}>{job}</h1>
        <h2 className={`${styles.sectionSubText}`}>{company}</h2>
        <div className="flex flex-row w-full">
          <h2 className={`font-heading`}>{startDate}</h2><p className="font-heading px-4">-</p><h2 className={`font-heading`}>{endDate}</h2>
        </div>
        {details.map((detail,index) => (
          <div key={"dots_"+index} className="flex flex-row w-full h-auto justify-center items-center">
            <SquareDot className="h-4 h-4"/>
            <p key={"DotsInfo"+index} className="mt-1 sm:mt-2 flex flex-row font-bold text-[10px] sm:text-[12px] w-full gap-4 h-auto">{detail}</p>
          </div>
        ))}
      </motion.div>
      <motion.div 
        key={"CardImage"+index}
        initial={{ x: "100%", y:0, opacity: 0 }}
        transition={{type:"tween", duration:0.2,delay:0.2,ease:"easeOut"}}
        animate={{ x: 0, y:0,opacity: 1 }}
        exit={{ x: "100%",y:0, opacity: 0 }}
        className="w-full lg:w-1/2 h-full hidden sm:flex flex-col justify-center items-center p-4">
          <motion.img
            key={selectedImage}
            src={selectedImage}
            initial={{ x: 300, y:0, opacity: 0 }}
            animate={{ x: 0, y:0,opacity: 1 }}
            exit={{ x: -300,y:0, opacity: 0 }}
            className='relative w-auto h-[400px] lg:w-full lg:h-[400px] object-contain rounded-md shadow-cardlight border-4 border-secondary '
          />
        <div className="flex flex-row w-full h-auto justify-around items-center mt-6">
          <ChevronLeft className="h-10 w-10 hover:translate-x-[-10px] ease-in-out duration-500 cursor-pointer" onClick={()=>previousImage()}/>
          <ChevronRight className="h-10 w-10 hover:translate-x-[10px] ease-in-out duration-500 cursor-pointer" onClick={()=>nextImage()} />
        </div>
      </motion.div>
    </div>
  )
}

interface ExperienceCompProps {
  experiences: ExperienceLanguage[];
}

const JobExperiences = (props:ExperienceCompProps) => {

  const {experiences} = props;
  const {i18n} = useTranslation();

  const [DataExperiences,setDataExperiences] = useState<ExperienceProps[]>([]);
  const [IndexCurrentJob,setIndexCurrentJob] = useState<number>(0);
  const [CurrentJob,setCurrentJob] = useState<ExperienceProps|undefined>(undefined)

  useEffect(()=>{
    if(experiences && experiences.length > 0){
      const languageProduct = experiences.find(item => item.language === i18n.language);
      if(languageProduct){
        setDataExperiences(languageProduct.content.sort((a, b) => b.id - a.id));
      }
    }
  },[i18n.language])

  useEffect(()=>{
    if(DataExperiences && DataExperiences.length > 0){
      setCurrentJob(DataExperiences[IndexCurrentJob]); 
    }
  },[IndexCurrentJob,DataExperiences])

  const isCurrentJob = (index:number) => {
    setIndexCurrentJob(index);
  }


  return (
    <>
      <div className="w-full h-full flex flex-col lg:flex-row gap-4 overflow-hidden">
        <motion.div 
          className="w-full h-full flex-col  justify-center items-center p-4">
          <motion.div className="flex  w-full h-auto ">
            {CurrentJob != undefined && (
              <JobCardDetail key={"JobCard_" + IndexCurrentJob}  index={IndexCurrentJob} {...CurrentJob}/>
            )}
          </motion.div>
          <motion.div className="w-full h-auto flex flex-row justify-center items-center gap-2">
            {DataExperiences.map((_,index) => {
              return <span key={"JobCardTrigger_" + index}  className={`${IndexCurrentJob === index ? "bg-secondary":""} h-8 w-8 shadow-cardlight rounded-full bg-primary hover:bg-secondary ease-in-out duration-300 cursor-pointer`} onClick={()=>isCurrentJob(index)}/>
            })}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(JobExperiences, "experience");
