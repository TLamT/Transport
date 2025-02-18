"use client"
import Link from "next/link";
import { useEffect, useState } from 'react';
import { ChoosingRoute } from './components/ChoosingRoute';
import { SearchBar } from './components/SeachBar';
import { fetchAllLineData } from './fetchFunction';
import ShowingStopsAndTime from "./components/ShowingStopAndTime";
function App() {
  const [Search, setSearch] = useState('');
  const [allLineData, setAllLineData] = useState([]);
  const [choosedRoute, setChosenRoute] = useState({});
  const [currentTime, setCurrentTime] = useState(null);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滾動
    });
  };
  useEffect(() => {
    const fetch=async()=>{
      const data = await fetchAllLineData();
      setAllLineData(data);
    }
    fetch();
  }, []);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId); 
    }, []);
  return(
    <div className="">
    <div className="flex justify-center gap-6 text-2xl text-black">
    <Link className="hover:underline hover:text-red-600" href="/">首頁</Link>
      <Link className="mb-4 hover:underline hover:text-red-600" href="./MTR">MTR</Link>
    </div>
    <div className="flex justify-center">
    <img className="w-1/4" src="https://cdn.coupert.com/ccsimg/dcs/img_tools/dcs_img_6b623e19ba5f026e5a5da48c3191f7a5.webp"/>
    </div>
    <div className='text-center flex gap-2 justify-center mt-10 w-full text-black'>
      <div className="flex bg-gray-200 border-2 border-black">

      <div className='text-xl'>當前時間:</div>
      <div className='text-xl'>{currentTime ? currentTime.toLocaleTimeString() : '加載中...'}</div>
    </div>
      </div>
    <SearchBar Search={Search} setSearch={setSearch}/>
    <ChoosingRoute Search={Search} setChosenRoute={setChosenRoute} allLineData={allLineData}/>
    <ShowingStopsAndTime choosedRoute={choosedRoute}/>
    <button 
      onClick={scrollToTop} 
      className="opacity-40 hover:opacity-100 fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      aria-label="Scroll to top"
    >
      ↑
    </button>

    </div>
    
  )
}

export default App;
