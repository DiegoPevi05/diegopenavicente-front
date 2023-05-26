import {useState,useEffect} from 'react';
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../components/ui/hoc";
import { ChevronLeft, ChevronRight, Code,Book} from "lucide-react";
import Button from '../components/ui/Button';
import {useTranslation} from 'react-i18next';
import {BookLanguage,BookProps} from '../interfaces'

interface propsBookDetail extends BookProps {
  index:number;
}

const BookItem = (props:propsBookDetail) => {
  const { index,id,img, href, title, author,content } = props 
  const {t} = useTranslation();

  return (
    <motion.ul 
      key={"Book_"+index+"_"+id}
      initial={{ x: "100%", y:0, opacity: 0 }}
      transition={{type:"spring", duration:0.75,delay:index*0.5,ease:"easeOut"}}
      animate={{ x: 0, y:0,opacity: 1 }}
      exit={{ x: "100%",y:0, opacity: 0 }}
      className="w-1/2 text-center"
    >
      <li>
        <figure className='book'>
          <ul className='hardcover_front'>
            <li>
              <img src={img} className="absolute top-0 bottom-0 right-0 left-0 object-cover"/>
            </li>
            <li></li>
          </ul>
          <ul className='page'>
            <li></li>
            <li>
              <a className="btn hover:text-secondary hover:border-secondary" target="_blank" href={href}>{t('Buy')}</a>
            </li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul className='hardcover_back'>
            <li></li>
            <li></li>
          </ul>
          <ul className='book_spine'>
            <li></li>
            <li></li>
          </ul>
          <figcaption>
            <h2 className="font-heading text-[11px]">{title}</h2>
            <span className="text-secondary">By {author}</span>
            <p className="text-primary text-[10px] text-center sm:text-justify">{content}</p>
          </figcaption>
        </figure>
      </li>
    </motion.ul>
  )
}

interface BookCompProps {
  books: BookLanguage[];
}


const BooksComponent = (props:BookCompProps) => {
  const {books} = props;
  const {t,i18n} = useTranslation();

  const [numberBooks,setNumberBooks] = useState<number>(3);
  const [currentIndex,setCurrentIndex] = useState<number>(0);
  const [BooksData,setBooksData] = useState<BookProps[]>([]);
  const [ShowData,setShowData] = useState<BookProps[]>([]);
  const [typeSelected,setTypeSelected] = useState<string>("code");

  useEffect(()=>{
    if(books && books.length > 0){
      const languageBook = books.find(item => item.language === i18n.language);
      if(languageBook){
        const filteredTypeBooks = languageBook.content.filter(item => item.type === typeSelected);
        if(filteredTypeBooks){
          setBooksData(filteredTypeBooks.sort((a, b) => b.id - a.id));
        }
      }
    }
    setCurrentIndex(0);
  },[i18n.language,typeSelected])

  const handleTypeSelect = (type:string) => {
    setTypeSelected(type);
  }

  // New function to update the number of cards based on screen width
  const updateNumberCards = () => {
    if (window.innerWidth <= 480) {
      setNumberBooks(1);
    } else if(window.innerWidth <= 820) {
      setNumberBooks(1);
    }else {
      setNumberBooks(2);
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
    if(BooksData.length > numberBooks){
      setShowData(BooksData.slice(currentIndex,currentIndex+numberBooks));
    }else{
      setShowData(BooksData.slice(currentIndex));
    }
  },[BooksData,currentIndex,numberBooks])


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const remainingItems = BooksData.length - prevIndex - numberBooks;
      let newIndex = prevIndex + numberBooks;

      if(remainingItems > numberBooks){
        setShowData(BooksData.slice(newIndex, newIndex + numberBooks));
      }else if (remainingItems > 0) {
        setShowData(BooksData.slice(newIndex));
      }else{
        newIndex = prevIndex;
      }
      return newIndex;
    });
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - numberBooks >= 0 ? prevIndex - numberBooks : prevIndex
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      <h1 className={`${styles.sectionSubText} relative top-32 text-center w-full`}>{t("Some Books i recommend")}</h1>
      <div className="w-full h-auto relative top-40 flex flex-row justify-center items-center z-[1000] gap-4">
        <Button onClick={()=>handleTypeSelect("code")} className={`${typeSelected === "code" ? 'bg-secondary':''} ease-in-out duration-700`}><Code className="mr-2"/>{t("Code")}</Button>
        <Button onClick={()=>handleTypeSelect("cultural")} className={`${typeSelected === "cultural" ? 'bg-secondary':''} ease-in-out duration-700 `}><Book className="mr-2"/>{t("Cultural")}</Button>
      </div>
      <div className="w-full h-full flex flex-col md:flex-row items-center gap-0 sm:gap-4 overflow-hidden">
        <ChevronLeft className="hidden md:flex h-16 w-16 hover:translate-x-[-10px] ease-in-out duration-500 cursor-pointer" onClick={()=>previousSlide()}/>
        <motion.div
          className="w-full h-[650px] sm:h-[700px] flex flex-row  justify-center items-center p-4 sm:ml-10 relative gap-4">
          {ShowData.map((book, index) => (
            <BookItem
              key={"BookItem_" + index}
              index={index}
              {...book}
            />
          ))}
        </motion.div>
        <ChevronRight className="hidden md:flex h-16 w-16 hover:translate-x-[10px] ease-in-out duration-500 cursor-pointer" onClick={()=>nextSlide()} />
        <div className="relative bottom-5 sm:bottom-10 flex flex-row justify-center items-center gap-4 md:hidden">
          <ChevronLeft className="flex h-10 w-10 sm:h-16 sm:w-16 hover:translate-y-[-20px] ease-in-out duration-500 cursor-pointer" onClick={()=>previousSlide()}/>
          <ChevronRight className="flex h-10 w-10 sm:h-16 sm:w-16 hover:translate-y-[-20px] ease-in-out duration-500 cursor-pointer" onClick={()=>nextSlide()} />
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(BooksComponent, "books");
