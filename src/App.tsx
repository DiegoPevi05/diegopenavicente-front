import {Suspense, useState, useEffect} from 'react';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Providers from './components/Providers';
import './lib/i18n';
import {mapInputData} from './lib/utils';
import {toast} from "react-hot-toast";
import {WebData} from './interfaces';
import  LoadingComponent from './components/ui/Loader';
import axios from 'axios';



function App() {

  const [webData, setWebData] = useState<WebData|undefined>();
  //axios to call api and get data
  const getDataFromServer = async () => {
    try {
      const header = {
        "x-api-key": import.meta.env.VITE_API_KEY,
      }
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/content-web/all', {headers: header});
      setWebData(mapInputData(response.data));
    }catch (err) {
      toast.error("Ha habido un error trayendo la información del servidor");
    } 
  }

  useEffect(() => {
    getDataFromServer();
  }, []);


  return(
    <Suspense fallback={<LoadingComponent isLoading={true}/>}>
      <Providers>
          <Router>
            <Routes>
              <Route path='/' element={<Home webData={webData}/>} />
            </Routes>
          </Router>
      </Providers>
    </Suspense>
  ) 
}

export default App
