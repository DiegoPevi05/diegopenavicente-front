import { useEffect} from 'react'
import {writingAll} from '../../lib/utils.ts';
import { styles } from '../../styles';
import {useTranslation} from 'react-i18next';

const TextWritter = () => {


  const {t,i18n} = useTranslation();
  useEffect(() => {
    writingAll([t("Engineering"),t("Web Developer"),t("Data Analysis"),t("Mobile Apps")], "data-text-hero");
  },[i18n.language]);

  return (
    <>
      <h1 id="data-text-hero" className={`${styles.heroHeadText} text-secondary`}>
      </h1>
      <span className={`${styles.heroHeadText} underscore text-secondary`}>_</span>
    </>
  );
};


export default TextWritter;
