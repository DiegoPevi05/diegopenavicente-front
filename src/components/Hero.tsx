import {motion} from 'framer-motion';
import { styles } from '../styles';
import { staggerContainer, slideIn } from "../lib/motions";
import TextWritter from '../components/subCompontents/TextWritter';
import Link from '../components/ui/Link';
import { User, FileText } from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {webContentLanguage} from '../interfaces';

interface HeroCompProps {
  webContent?: webContentLanguage[];
}

const Hero = (props:HeroCompProps) => {
  const {webContent} = props;
  const { t, i18n } = useTranslation();
  return(
      <motion.section 
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col lg:flex-row w-full h-full sm:h-[800px] mx-auto overflow-hidden">
        <motion.div 
          variants={slideIn("left", "tween", 0.2, 1)}
          className="w-full w-full lg:w-1/2 h-screen sm:h-full flex justify-center items-center">
          <TextWritter/>
        </motion.div>
        <motion.div 
          variants={slideIn("right", "tween", 0.2, 1)}
          className={`${styles.paddingX} relative inset-0 mx-auto flex flex-col w-full lg:w-1/2 items-center justify-center gap-5`}>
          <div className="w-full">
            <h1 className={`${styles.heroHeadText} text-secondary text-center sm:text-left`}>
              {t("Hi, I'm")} <span className='text-primary'>Diego Pena Vicente</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100 w-full sm:w-[400px] text-center sm:text-left`}>
              {t('Welcome to my Page')}<br className='sm:block hidden' />
              {webContent?.find((item) => item.language === i18n.language)?.content.find((item) => item.name === "HeroDescription")?.content ?? ''}
            </p>
            <div className="flex flex-row mt-8 sm:mt-5 gap-5 justify-center sm:justify-start">
              <Link className="text-sm sm:text-md gap-2"  href="#aboutme"><User/>{t('AboutMe')}</Link>
              <Link className="text-sm sm:text-md gap-2"  href="#experience"><FileText/>{t('Experience')}</Link>
            </div>
          </div>
        </motion.div>
      </motion.section>
  )
}

export default Hero;
