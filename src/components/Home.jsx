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
    <div className="h-full w-full bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] ">

      {/* Image Section */}
      <div className=" w-full h-[40vh] md:h-[50vh] lg:[60vh] ">
        <img
          src="/main.jpeg"
          alt="Piyush Ras — हिंदी कविता होम बैनर"
          className="w-full h-full object-cover md:hidden object-center"
        />
        <img
          src="/main2.png"
          alt="Piyush Ras — हिंदी कविता और शायरी"
          className="w-full hidden md:block  h-full object-cover object-center"
        />
      </div>
      <div className="px-4 py-6">
        <div className="text-lg text-white font-bold mb-4 flex items-center gap-x-4">
          <h1>नवीनतम कविताएँ</h1>
          <Link
            to="/allKavita"
          >
            <div className=' flex items-center rounded-xl p-2 bg-[#ad6404db] hover:cursor-pointer gap-x-1'>
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