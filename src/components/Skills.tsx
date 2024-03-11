import {useState,useEffect, useCallback,useRef} from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../components/ui/hoc";
import {  fadeIn } from "../lib/motions";
import { generatePoints } from "../lib/utils";
import {RotateCw} from "lucide-react";
import {useTranslation} from 'react-i18next';
import Button from '../components/ui/Button';
import {SkillLanguage,SkillProps} from '../interfaces'

interface Allcoordenates {
  lE:number;
  tE:number;
  hE:number;
  wE:number;
  lD:number;
  tD:number;
  hD:number;
  wD:number;
}


interface propsDetail extends SkillProps {
  index:number;
  hoverLanguage: (languageSelect:string) => void;
  coordenates:Allcoordenates;
}

const SkillDetail = (props:propsDetail) => {
  const [showDetail,setShowDetail] = useState<boolean>(false);
  const {index,id,title,description,keywords,image,hoverLanguage,coordenates} = props;

  const skillDetailPosition:any = {
    left: coordenates.lE,
    top: coordenates.tE,
    height: coordenates.hE,
    width: coordenates.wE,
  };

  const skillDescriptionPosition:any = {
    left: coordenates.lD,
    top: coordenates.tD,
    height: coordenates.hD,
    width: coordenates.wD,
  }

  const activeDetail = () => {
    hoverLanguage(title)
    setShowDetail(true);
  }
  const  disactiveDetail = () => {
    setShowDetail(false);
  }

  return (
    <motion.div 
      key={"skillDetail_"+id}
      onMouseEnter={()=>activeDetail()} 
      onMouseLeave={()=>disactiveDetail()}
      style={skillDetailPosition}
      initial={{ x: 0, y:"100%", opacity: 0 }}
      transition={{type:"spring", duration:0.75,delay:index*0.5,ease:"easeOut"}}
      animate={{ x: 0, y:0,opacity: 1 }}
      exit={{ x: 0,y:"100%", opacity: 0 }}
      className={`absolute cursor-pointer rounded-full bg-white-100 flex flex-col justify-center items-center ${showDetail ? "z-[100]":"z-[40]" } shadow-cardlight`}>
      <img src={image} className="w-auto h-full rounded-full object-cover overflow-hidden"/>
        <div 
          className={`absolute flex-col justify-start items-center bg-primary rounded-lg ${showDetail ? "flex" : "hidden"} overflow-hidden p-4 gap-4`}
          style={skillDescriptionPosition}
        >
          <h1 className="font-heading text-white">{title}</h1>
          <p className="text-white text-[12px] sm:text-[14px]">{description}</p>
          <div className="w-full h-auto flex flex-row flex-wrap justify-start items-center gap-2">
            {keywords.map((keyword,index)=>(
              <span key={"keyword_"+title+"_"+index} className="shadow-cardlight rounded-lg px-2 py-0 bg-white text-primary text-[11px]">#{keyword}</span>
            ))}
          </div>
        </div>
    </motion.div>
  )
}


interface SkillCompProps {
  skills: SkillLanguage[];
}

const Skills = (props:SkillCompProps) => {

  const {skills} = props;
  const {t,i18n} = useTranslation();

  const [dataLanguages,setDataLangauges] = useState<SkillProps[]>([]);
  const [Language, setLanguage] = useState<string|null>(t("Languages") ?? "");
  const [coordenates, setCoordenates] = useState<any[]>([]);
  const [numberElement,setNumberElements] = useState<number>(0);
  const firstChildRef = useRef<HTMLDivElement>(null);


  useEffect(()=>{
    setLanguage(t("Languages"))
    if(skills && skills.length > 0){
      const languageProduct = skills.find(item => item.language === i18n.language);
      if(languageProduct){
        setDataLangauges(languageProduct.content);
        setNumberElements(languageProduct.content.length);
      }
    }
    ReGeneratePoints();
  },[i18n.language])

  const hoverLanguage = (languageSelect:string) => {
    setLanguage(languageSelect);
  }

  useEffect(() => {
    function handleWindowResize() {
      if (firstChildRef.current) {
            setCoordenates(
              generatePoints(
                firstChildRef.current?.offsetWidth ?? 0 * 0.95,
                firstChildRef.current?.offsetHeight ?? 0 * 0.9,
                numberElement
              )
            );
      }
    }


    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setCoordenates(generatePoints(firstChildRef.current?.offsetWidth ?? 0 * 0.95, firstChildRef.current?.offsetHeight ?? 0 * 0.9, numberElement))
  }, [firstChildRef,numberElement])

  const ReGeneratePoints = useCallback(() => {
    setCoordenates(generatePoints(firstChildRef.current?.offsetWidth ?? 0 * 0.95, firstChildRef.current?.offsetHeight ?? 0 * 0.9, numberElement))
  }, [firstChildRef,numberElement])


  return (
    <motion.div
      variants={fadeIn("up", "", 0.2, 1)}
      className='relative w-full h-[600px] sm:h-[800px] flex flex-col justify-center items-center'
      ref={firstChildRef}
    >
      <h1 className={`${styles.sectionHeadText} z-[80] hover:text-secondary text-center duration-300 ease-in-out cursor-pointer`}>{Language}</h1>
      {coordenates.length !== 0 && (
        coordenates.map((cord, index) => (
          <SkillDetail key={`${index}-${cord.lE}-${cord.tE}`} index={index} {...dataLanguages[index]} hoverLanguage={hoverLanguage} coordenates={cord} />
      )))}
      <Button className="absolute bottom-0 right-0 rounded-full h-16 w-16" onClick={()=>ReGeneratePoints()}>
        <RotateCw className="h-10 w-10 hover:animate-spin duration-800"/>
      </Button>
    </motion.div>
  );
};

export default SectionWrapper(Skills, "skills");
