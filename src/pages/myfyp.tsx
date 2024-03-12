import {useEffect, useState} from "react";
import Loader from '../components/ui/Loader.tsx';
import { DiegoProfile } from "../assets/images";
import { MyFYPProps } from "../interfaces";
import { motion } from "framer-motion";
import {Github, Linkedin, Earth, Building2, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/ui/LanguageSelector";

const icons:any = {
  Github: Github,
  Linkedin: Linkedin,
  Earth: Earth,
  Building2: Building2,
  Twitter: Twitter,
  Instagram: Instagram
}

interface SelectionButtonProps {
  index:number;
  text: string;
  href: string;
  iconName: string;
  triggerLink: (href:string) => void;
}

const SelectionButton = ({ index, text,href, iconName, triggerLink }:SelectionButtonProps) => {
  const Icon = icons[iconName];
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0.9, opacity: 0, y: 50}}
      animate={{ scale: 1, opacity: 1, y: 0}}
      transition={{ duration: 0.3 , ease: "easeInOut", delay: index*0.5}}
      onClick={()=>triggerLink(href)}
      className="bg-sky-200 text-primary font-bold px-4 py-2 rounded-2xl shadow-md hover:bg-primary hover:text-white transition duration-300 ease-in-out w-72 flex flex-row justify-around items-center cursor-pointer"
    >
      <span>{text}</span>
      <Icon size={24} />
    </motion.div>
  );
};

 
interface MyFYPPropsInternal {
  links: MyFYPProps[] | undefined;
}


const MyFYP = (props:MyFYPPropsInternal) => {

  const {links} = props;

  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if(links !== undefined){
      setLoading(false);
    }
  }, [links]);

  const GoToLink = (link:string) => {
    window.open(link, '_blank');
  }


  if(loading || links == undefined){
    return <Loader isLoading={loading}/>

  }else{
    return (
      <div className="h-screen w-screen flex flex-col justify-start items-center pt-24 px-8 gap-6">
        <div className="absolute top-2 right-6 w-28 h-auto bg-transparent z-20">
          <LanguageSelector/>
        </div>
        <h1 className="font-heading">Diego Peña Vicente</h1>
        <img src={DiegoProfile} className="rounded-full h-28 w-28 border-primary border-4"/>
        <p className="font-heading text-xs text-primary text-center w-full">{t("Welcome to my personal link webpage here are my social networks and my company page")}</p>
        <div className="w-full h-auto gap-6 flex flex-col justify-center items-center">
          {links.map((link, index) => (
            <SelectionButton key={index} index={index} text={t(link.name)} href={link.link} iconName={link.icon} triggerLink={GoToLink}/>
          ))}
        </div>
      </div>
    );
  }

};

export default MyFYP;
