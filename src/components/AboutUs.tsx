import { motion } from "framer-motion";
import { SectionWrapper } from "../components/ui/hoc";
import {slideIn } from "../lib/motions";
import Link from '../components/ui/Link';
import { DiegoProfile,PeruFlag,UsaFlag,ItalyFlag  } from "../assets/images";
import {Lightbulb,Luggage,Headphones,Mic} from "lucide-react";
import {useTranslation} from 'react-i18next';
import Button from '../components/ui/Button';
import {webContentLanguage} from '../interfaces';

interface AboutCompProps {
  webContent?: webContentLanguage[];
}

const About = (props:AboutCompProps) => {
  const {webContent} = props;
  const {t,i18n} = useTranslation();

  const changeLanguage = (language:string) => {
    i18n.changeLanguage(language);
  }


  return (
    <>
      <div className="w-full h-full flex flex-col lg:flex-row gap-4 overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='w-full h-auto lg:h-full flex items-center justify-center py-4 lg:p-20 rounded-md'
        >
          <img src={DiegoProfile} alt='ProfileImage' className='relative w-auto h-[300px] lg:w-full lg:h-full object-cover rounded-md shadow-cardlight' />
        </motion.div>
        <motion.div 
          variants={slideIn("right", "tween", 0.2, 1)}
          className="w-full h-auto lg:h-[600px] flex flex-col justify-start items-center gap-4 p-4 sm:p-6">
          <motion.div className="flex flex-col sm:flex-row w-full h-auto mt-2 md:mt-8 gap-2 sm:gap-4">
            <div className="shadow-cardlight w-full h-auto flex flex-col justify-center items-center py-2 px-4 sm:p-4 rounded-lg ease-in-out duration-300 hover:translate-y-[-10px]">
              <Lightbulb />
              <h1 className="font-bold text-[12px] sm:text-[16px] text-center">{t("Experience")}</h1>
              <p className="text-[12px] sm:text-[16px] text-center">
                {webContent?.find((item) => item.language === i18n.language)?.content.find((item:any) => item.name === "AboutExperience")?.content ?? ''}
              </p>
            </div>

            <div className="shadow-cardlight w-full h-auto flex flex-col justify-center items-center py-2 px-4 sm:p-4 rounded-lg ease-in-out duration-300 hover:translate-y-[-10px]">
              <Luggage />
              <h1 className="font-bold text-[12px] sm:text-[16px] text-center">{t("Completed")}</h1>
              <p className="text-[12px] sm:text-[16px] text-center">
                {webContent?.find((item) => item.language === i18n.language)?.content.find((item:any) => item.name === "AboutCompleted")?.content ?? ''}
              </p>
            </div>

            <div className="shadow-cardlight w-full h-auto flex flex-col justify-center items-center py-2 px-4 sm:p-4 rounded-lg ease-in-out duration-300 hover:translate-y-[-10px]">
              <Headphones />
              <h1 className="font-bold text-[12px] sm:text-[16px] text-center">{t("Support")}</h1>
              <p className="text-[12px] sm:text-[16px] text-center">
                {webContent?.find((item) => item.language === i18n.language)?.content.find((item:any) => item.name === "AboutSupport")?.content ?? ''}
              </p>
            </div>
          </motion.div>
          <motion.p
            className='w-full h-auto mt-4 sm:mt-12 text-primary text-justify text-[14px] leading-[18px] lg:text-[17px] lg:leading-[25px]'
          >
            {webContent?.find((item) => item.language === i18n.language)?.content.find((item) => item.name === "AboutDescription")?.content ?? ''}
          </motion.p>
          <span className="w-full font-heading flex flex-row">I can Speak <Mic/></span>
          <div className="w-full h-auto flex flex-row justify-center items-center gap-2">
            <Button onClick={() => changeLanguage("es")}> <img src={PeruFlag} alt="" className="h-4 w-5 flex-shrink-0 mr-1" />{t("Spanish")}</Button>
            <Button onClick={() => changeLanguage("en")} > <img src={UsaFlag} alt="" className="h-4 w-5 flex-shrink-0 mr-1" /> {t("English")}</Button>
            <Button onClick={() => changeLanguage("it")}> <img src={ItalyFlag} alt="" className="h-4 w-5 flex-shrink-0 mr-1" /> {t("Italian")}</Button>
          </div>
          <Link size="lg" className="px-[24px]" href="#contact">{t('Contact Me')}</Link>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "aboutme");
