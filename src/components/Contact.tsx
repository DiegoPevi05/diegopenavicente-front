import {FC, useState } from "react";
import { motion } from "framer-motion";
import {Logo} from "../assets/images"
import { styles } from "../styles";
import { SectionWrapper } from "./ui/hoc";
import { slideIn } from "../lib/motions";
import {toast} from "react-hot-toast";
import Button from './ui/Button';
import { useTranslation } from 'react-i18next';
import axios from "axios";

interface FormProps {
  name:string;
  email:string;
  message:string;
}

const Contact:FC = () => {

  const {t,i18n} = useTranslation();
  const [Loading, setLoading] = useState<boolean>(false);

  const emptyData:FormProps = {
    name:"",
    email:"",
    message:""
  }

  const [form, setForm] = useState<FormProps>(emptyData);

  const handleChange = (event:any) => {
    const { target } = event;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };


  //which is the type of React Event hanlder
  const handleSubmit = async() => {
    setLoading(true);
    try{
      const config = {
        headers: {
          Authorization: "diegopenavicente2023"
        },
        params:{
          language:i18n.language
        }
      }
      await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/send-email",form,config);
      setForm(emptyData);
      toast.success("Mensaje enviado con éxito");
    } catch(error){
      toast.error("No se ha podido enviar el mensaje");
    } finally{
      setLoading(false);
    }

  };

  return (
    <div
      className={`xl:mt-0 h-full flex md:flex-row flex-col-reverse gap-0 lg:gap-10 overflow-hidden `}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='w-full md:w-1/2  p-4 sm:p-8 rounded-2xl red-orange-gradient'
      >
        <p className={styles.sectionSubText}>{t('Information')}</p>
        <h2 className={styles.sectionHeadText}>{t('Contact Us')}</h2>
        <div
          className='mt-0 flex flex-col gap-2 sm:gap-8 w-full'
        >
          <div className='flex flex-col'>
            <span className='font-heading font-small sm:text-lg mb-2 sm:mb-4'>{t('Name')}</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder={t('What is your name?').toString()}
              className='bg-secondary py-2 sm:py-4 px-6 text-primary placeholder:text-primary rounded-lg font-small sm:font-medium
                transition-color focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              '
            />
          </div>
          <div className='flex flex-col'>
            <span className='font-heading font-small sm:text-lg mb-2 sm:mb-4'>{t('Email')}</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder={t('What is your email?').toString()}
              className='bg-secondary py-2 sm:py-4 px-6 text-primary placeholder:text-primary rounded-lg font-small sm:font-medium
                transition-color focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              '
            />
          </div>
          <div className='flex flex-col'>
            <span className='font-heading font-small sm:text-lg mb-2 sm:mb-4'>{t('Message')}</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder={t('What you want to say?').toString()}
              className='bg-secondary py-2 sm:py-4 px-6 text-primary placeholder:text-primary rounded-lg font-small sm:text-lg 
                transition-color focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              '
            />
          </div>
          <Button 
            type="submit" 
            isLoading={Loading} 
            className="text-lg"
            onClick={handleSubmit}
          >
            {t('Send')}
          </Button>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='w-full md:w-1/2 h-auto flex items-center '
      >
          <motion.img
            src={Logo}
            alt="BirthdayCake"
            className="w-full h-[140px] sm:h-[180px] lg:h-auto object-contain"
          />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
