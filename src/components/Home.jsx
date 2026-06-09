import React, { useEffect, useState } from 'react'
import { Card, } from "./index"
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { fetchLatestPoetry } from '../services/poetry.service';
const Home = () => {
  const [poetryInfo, setPoetryInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoetryInfo = async() => {
      setLoading(true);
      const res = await fetchLatestPoetry();
      if (res.statusCode === 200) {
        setPoetryInfo(res.data);
        setLoading(false);      }

    }
    fetchPoetryInfo();
  }, [])

  return (
    <div className="h-full w-full bg-[#FFF2C6] ">

      {/* Image Section */}
      <div className="w-full h-[90%] bg-[#FDF8EE]">
  {/* Mobile Layout */}
  <div className="md:hidden">
    <img
      src="/newhomebanner.png"
      alt="Piyush Ras"
      className="w-full h-auto object-contain"
    />
  </div>

  {/* Desktop Layout */}
  <div className="hidden md:flex h-[80%] items-center">
    
    {/* Left Content */}
    <div className="w-1/2 px-12 lg:px-20">
      <h1 className="text-5xl font-bold text-amber-900 mb-6">
        Piyush Ras
      </h1>

      <p className="text-lg text-amber-800 leading-8 mb-8">
        कविता, गीत, शायरी और साहित्य की सुंदर दुनिया में आपका स्वागत है।
        यहाँ आपको नई कविताएँ, प्रेरणादायक रचनाएँ और हृदय को छू लेने वाले
        गीत पढ़ने और सुनने को मिलेंगे।
      </p>

      <button className="px-8 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition">
        Explore Poems
      </button>
    </div>

    {/* Right Image */}
    <div className="w-1/2 flex justify-end">
      <img
        src="/newhomebanner.png"
        alt="Piyush Ras"
        className="w-full h-full object-cover object-center"
      />
    </div>

  </div>
</div>
      
      <div className="px-4 py-6">
        <div className="text-lg text-white font-bold mb-4 flex items-center gap-x-4">
          <h1 className='text-black'>Latest</h1>
          <Link
            to="/allKavita"
          >
            <div className=' flex items-center rounded-xl p-1 px-2 bg-amber-700 text-white hover:cursor-pointer gap-x-1'>
              <h2 className='text-sm'>View All</h2>
              <FaAngleDoubleRight /></div>
          </Link>
        </div>

        <div className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-5 
    gap-4
  ">
          
         { 
         loading ? Array.from({ length: 6 }, (_, i) => (
          <SkeletonHomeComponent key={i} id={i} />
        )) :
         poetryInfo.map((poetry)=>(
          <Card key={poetry._id} data = {poetry}/>
         ))
         }
        </div>
      </div>

    </div>
  )
}

export default Home

export function SkeletonHomeComponent(){
  return (
    <div className="w-full h-full flex flex-col gap-y-4 z-30 mt-5 sm:mt-2 p-2">
    <div className="w-full h-[200px] animate-pulse bg-yellow-800 rounded-lg"></div>
    <div className="w-1/2 h-[20px] animate-pulse bg-yellow-800 rounded-md"></div>

  </div>
  );
}