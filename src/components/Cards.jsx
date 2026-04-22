import React, { useRef, useState, useEffect } from "react";
import {Card_2} from "./index";
import { TfiAngleLeft } from "react-icons/tfi";
import { BsChevronRight } from "react-icons/bs";
import {fetchAllPoetry as serviceFetchAllPoetry} from "../services/poetry.service"
import { SkeletonHomeComponent } from "./Home";
import { Helmet } from "react-helmet-async";

const Cards = () => {
  const [kavita, setKavita] = useState([]);
  const [longPoem, setlongPoem] = useState([]);
  const [shayari, setShayari] = useState([]);
  const [festivalSpecial, setFestivalSpecial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchAllPoetry = async () => {
      setLoading(true);
      const res = await serviceFetchAllPoetry();

      if (res.statusCode === 200) {
        console.log(res?.data[0])
        setKavita(res?.data[0]?.kavita[0]?.data || []);
        setlongPoem(res?.data[0]?.longPoem[0]?.data || []);
        setShayari(res.data[0].shayari[0]?.data || []); 
        setFestivalSpecial(res?.data[0]?.festivalSpecial[0]?.data || []);
        setLoading(false);
      }
      
      
    }

    fetchAllPoetry();

  },[])

// ✅ 4 alag refs
const ref1 = useRef(null);
const ref2 = useRef(null);
const ref3 = useRef(null);
const ref4 = useRef(null);

// ✅ har section ke liye alag button state
const [state1, setState1] = useState({ left: false, right: true });
const [state2, setState2] = useState({ left: false, right: true });
const [state3, setState3] = useState({ left: false, right: true });
const [state4, setState4] = useState({ left: false, right: true });

// ✅ Generic scroll functions
const scrollLeft = (ref) => {
if (!ref.current) return;
ref.current.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRight = (ref) => {
if (!ref.current) return;
ref.current.scrollBy({ left: 300, behavior: "smooth" });
};

// ✅ Generic check function
const checkScroll = (ref, setState) => {
if (ref.current) {
const { scrollLeft, scrollWidth, clientWidth } = ref.current;


  setState({
    left: scrollLeft > 0,
    right: scrollLeft + clientWidth < scrollWidth - 1,
  });
}


};

// ✅ resize listener
useEffect(() => {
const handleResize = () => {
checkScroll(ref1, setState1);
checkScroll(ref2, setState2);
checkScroll(ref3, setState3);
checkScroll(ref4, setState4);
};


handleResize();
window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);


}, []);

return ( 
<>
<Helmet>
    <title>{`Piyush Ras - All Poetries}`}</title>
  <meta
    name="description"
    content={"Best Hindi poetry platform"}
  />
      </Helmet>
<div className="w-full min-h-screen bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] font-['Yatra_One']"> <div className="flex flex-col gap-y-11 overflow-hidden py-9">

    {/* 🔹 SECTION 1 */}
    <div className="w-[85%] mx-auto flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl text-white font-semibold ml-2">कविताएँ</h2>
        {/* <h2 className="text-md text-yellow-600 hover:underline mr-2">संपूर्ण</h2> */}
      </div>

      <div className="relative group">
        {state1.left && (
          <button onClick={() => scrollLeft(ref1)} className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-700 hover:bg-yellow-900 p-3 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
            <TfiAngleLeft />
          </button>
        )}

        <div
          ref={ref1}
          onScroll={() => checkScroll(ref1, setState1)}
          className="flex overflow-x-auto scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
              <Card_2 id={i} />
            </div>
          ))} */}
          {
            loading ? Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
                <SkeletonHomeComponent key = {i} />
              </div>
            )) :
            kavita.length > 0 ?
            kavita.map((kavita) => (
              <div key={kavita._id} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
              <Card_2  data = {kavita}/>
            </div>
            )): (<p>There is No kavita type content available</p>)
          }

        </div>

        {state1.right && (
          <button onClick={() => scrollRight(ref1)} className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-700 hover:bg-yellow-900 p-3 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
            <BsChevronRight />
          </button>
        )}
      </div>
    </div>

    {/* 🔹 SECTION 2 */}
    <div className="w-[85%] mx-auto flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl text-white font-semibold ml-2"> Long कविताएँ</h2>
        {/* <h2 className="text-md text-yellow-600 hover:underline mr-2">संपूर्ण</h2> */}
      </div>

      <div className="relative group">
        {state2.left && (
          <button onClick={() => scrollLeft(ref2)} className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-700 p-3 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
            <TfiAngleLeft />
          </button>
        )}

        <div
          ref={ref2}
          onScroll={() => checkScroll(ref2, setState2)}
          className="flex overflow-x-auto scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
              <Card_2 id={i} />
            </div>
          ))} */}
          {
            loading ? Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
                <SkeletonHomeComponent key = {i} />
              </div>
            )) :
            longPoem.length > 0 ?
             longPoem.map((longPoem) => (
              <div key={longPoem._id} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
              <Card_2  data = {longPoem}/>
            </div>
            )):  (<p>There is No LongKavita type content available</p>)
          }
        </div>

        {state2.right && (
          <button onClick={() => scrollRight(ref2)} className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-700 p-3 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
            <BsChevronRight />
          </button>
        )}
      </div>
    </div>

    {/* 🔹 SECTION 3 */}
    <div className="w-[85%] mx-auto flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl text-white font-semibold ml-2">Shayari</h2>
        {/* <h2 className="text-md text-yellow-600 hover:underline mr-2">संपूर्ण</h2> */}
      </div>

      <div className="relative group">
        {state3.left && (
          <button onClick={() => scrollLeft(ref3)} className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-700 p-3 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
            <TfiAngleLeft />
          </button>
        )}

        <div
          ref={ref3}
          onScroll={() => checkScroll(ref3, setState3)}
          className="flex overflow-x-auto scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
              <Card_2 id={i} />
            </div>
          ))} */}
          {
            loading ? Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
                <SkeletonHomeComponent key = {i} />
              </div>
            )) : shayari.length > 0 ?
            shayari.map((shayari) => (
              <div key={shayari._id} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
              <Card_2  data = {shayari}/>
            </div>
            )): (<p>There is No shayari type content available</p>)
          }
        </div>

        {state3.right && (
          <button onClick={() => scrollRight(ref3)} className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-700 p-3 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
            <BsChevronRight />
          </button>
        )}
      </div>
    </div>

    {/* 🔹 SECTION 4 */}
    <div className="w-[85%] mx-auto flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl text-white font-semibold ml-2">Festival Poems</h2>
        {/* <h2 className="text-md text-yellow-600 hover:underline mr-2">संपूर्ण</h2> */}
      </div>

      <div className="relative group">
        {state4.left && (
          <button onClick={() => scrollLeft(ref4)} className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-700 p-3 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
            <TfiAngleLeft />
          </button>
        )}

        <div
          ref={ref4}
          onScroll={() => checkScroll(ref4, setState4)}
          className="flex overflow-x-auto scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
              <Card_2 id={i} />
            </div>
          ))} */}
          {
            loading ? Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%] gap-x-2">
                <SkeletonHomeComponent key = {i} />
              </div>
            )) : festivalSpecial.length > 0 ?
            festivalSpecial.map((festivalSpecial) => (
              <div key={festivalSpecial._id} className="min-w-[70%] sm:min-w-[30%] md:min-w-[30%] lg:min-w-[25%]">
              <Card_2 data = {festivalSpecial}/>
            </div>
            )): (<p>There is No festivalSpecial type content available</p>)
          }
        </div>

        {state4.right && (
          <button onClick={() => scrollRight(ref4)} className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-700 p-3 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
            <BsChevronRight />
          </button>
        )}
      </div>
    </div>

  </div>
</div>
</>

);
};

export default Cards;

// Kaita
// Dirgh Kavya
// Chand)shayari)
// Subhkamna kavya
