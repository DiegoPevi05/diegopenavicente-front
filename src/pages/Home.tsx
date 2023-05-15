import { useState, useEffect} from 'react';
import Loader from '../components/ui/Loader.tsx';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Experience from '../components/Experiences';
import Projects from '../components/Projects';
import SideGadget from '../components/SideGadget';
import Skills from '../components/Skills';
import Books from '../components/Books';
import Contact from '../components/Contact';
import {WebData} from '../interfaces'

interface HomeProps {
  webData: WebData | undefined;
}

const Home = ({webData}:HomeProps) => {

  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    if(webData != null && webData != undefined){
      setLoading(false);
    }
  },[webData])


  if(loading || webData == undefined){
    return <Loader isLoading={loading}/>

  }else{
    return(
      <>
        <SideGadget webContent={webData.webContent}/>
        <Navbar/>
        <Hero webContent={webData.webContent}/>
        <AboutUs webContent={webData.webContent}/>
        <Experience experiences={webData.experiences}/>
        <Projects projects={webData.projects}/>
        <Skills skills={webData.skills}/>
        <Books books={webData.books}/>
        <Contact/>
      </>
    )
  }
}

export default Home;
