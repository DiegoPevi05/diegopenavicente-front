import {useTranslation} from 'react-i18next';
import {Github,Linkedin,Instagram,Twitter} from "lucide-react";
import {webContentLanguage} from '../interfaces';


interface SideGadgetCompProps {
  webContent?: webContentLanguage[];
}

const SideGadget = (props:SideGadgetCompProps) => {
  const {webContent} = props;
  const {i18n } = useTranslation();

  return (
    <div className="fixed bottom-0 right-[30%] sm:right-0 sm:top-[40%] bg-white shadow-cardlight w-40 sm:w-10 h-10 sm:h-40 flex flex-row sm:flex-col justify-center items-center gap-3 z-[100] rounded-t-lg sm:rounded-l-lg">
      <a href={webContent?.find((item) => item.language === i18n.language)?.content.find((item:any) => item.name === "GitHubLink")?.content ?? ''}
           target="_blank">
          <Github className="hover:text-secondary cursor-pointer hover:scale-[1.2]"/>
        </a>
      <a href={webContent?.find((item) => item.language === i18n.language)?.content.find((item:any) => item.name === "LinkedInLink")?.content ?? ''} 
          target="_blank">
          <Linkedin className="hover:text-secondary cursor-pointer hover:scale-[1.2]"/>
        </a>
      <a href={webContent?.find((item) => item.language === i18n.language)?.content.find((item:any) => item.name === "InstagramLink")?.content ?? ''} 
          target="_blank">
          <Instagram className="hover:text-secondary cursor-pointer hover:scale-[1.2]"/>
        </a>
      <a href={webContent?.find((item) => item.language === i18n.language)?.content.find((item:any) => item.name === "TwitterLink")?.content ?? ''} 
          target="_blank">
          <Twitter className="hover:text-secondary cursor-pointer hover:scale-[1.2]"/>
        </a>
      </div>
  );
};

export default SideGadget;
