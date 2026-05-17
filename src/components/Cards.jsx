import React, { useRef, useState, useEffect } from "react";
import { Card_2 } from "./index";
import { TfiAngleLeft } from "react-icons/tfi";
import { BsChevronRight } from "react-icons/bs";
import { fetchAllPoetry as serviceFetchAllPoetry } from "../services/poetry.service";
import { SkeletonHomeComponent } from "./Home";
const PAGE_SIZE = 5;

const Cards = () => {
  const [kavita, setKavita] = useState([]);
  const [longPoem, setlongPoem] = useState([]);
  const [shayari, setShayari] = useState([]);
  const [festivalSpecial, setFestivalSpecial] = useState([]);

  const [pageKavita, setPageKavita] = useState(1);
  const [pageLong, setPageLong] = useState(1);
  const [pageShayari, setPageShayari] = useState(1);
  const [pageFestival, setPageFestival] = useState(1);

  const [loading, setLoading] = useState(false);

  // 🔥 Fetch function (pagination support)
  const fetchAllPoetry = async () => {
    setLoading(true);
    const res = await serviceFetchAllPoetry();

    if (res.statusCode === 200) {
      console.log("Fetching Kavita Page:", pageKavita);
      console.log("Fetching LongPoem Page:", pageLong);
      console.log("Fetching Shayari Page:", pageShayari);
      console.log("Fetching Festival Page:", pageFestival);

      const kavitaData = res?.data[0]?.kavita[0]?.data || [];
      const longData = res?.data[0]?.longPoem[0]?.data || [];
      const shayariData = res?.data[0]?.shayari[0]?.data || [];
      const festivalData = res?.data[0]?.festivalSpecial[0]?.data || [];

      setKavita(kavitaData.slice(0, pageKavita * PAGE_SIZE));
      setlongPoem(longData.slice(0, pageLong * PAGE_SIZE));
      setShayari(shayariData.slice(0, pageShayari * PAGE_SIZE));
      setFestivalSpecial(festivalData.slice(0, pageFestival * PAGE_SIZE));
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAllPoetry();
  }, []);

  // ✅ Scroll pagination trigger
  const handleScroll = (ref, type) => {
    if (!ref.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    if (scrollLeft + clientWidth >= scrollWidth - 50) {
      if (type === "kavita") setPageKavita((p) => p + 1);
      if (type === "long") setPageLong((p) => p + 1);
      if (type === "shayari") setPageShayari((p) => p + 1);
      if (type === "festival") setPageFestival((p) => p + 1);
    }
  };

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  return (
    <>
      <div className="w-full min-h-screen bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] font-['Yatra_One']">

<div className="flex flex-col gap-y-11 overflow-hidden py-9">

  {/* 🔹 SECTION 1 */}
  <div className="sm:w-[85%] w-[90%] mx-auto flex flex-col gap-y-5">
    <h2 className="text-xl sm:text-2xl text-white font-semibold ml-2">कविताएँ</h2>

    <div
      ref={ref1}
      onScroll={() => handleScroll(ref1, "kavita")}
      className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {
        loading
          ? Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="w-[350px] shrink-0">
              <SkeletonHomeComponent />
            </div>
          ))
          : kavita.map((item) => (
            <div key={item._id} className="w-[330px] sm:w-[350px]  shrink-0">
              <Card_2 data={item} />
            </div>
          ))
      }
    </div>
  </div>

  {/* 🔹 SECTION 2 */}
  <div className="w-[85%] mx-auto flex flex-col gap-y-5">
    <h2 className="text-xl sm:text-2xl text-white font-semibold ml-2">Long कविताएँ</h2>

    <div
      ref={ref2}
      onScroll={() => handleScroll(ref2, "long")}
      className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {
        loading
          ? Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="w-[350px] shrink-0">
              <SkeletonHomeComponent />
            </div>
          ))
          : longPoem.map((item) => (
            <div key={item._id} className="w-[330px] sm:w-[350px]  shrink-0">
              <Card_2 data={item} />
            </div>
          ))
      }
    </div>
  </div>

  {/* 🔹 SECTION 3 */}
  <div className="w-[85%] mx-auto flex flex-col gap-y-5">
    <h2 className="text-xl sm:text-2xl text-white font-semibold ml-2">Shayari</h2>

    <div
      ref={ref3}
      onScroll={() => handleScroll(ref3, "shayari")}
      className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {
        loading
          ? Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="w-[350px] shrink-0">
              <SkeletonHomeComponent />
            </div>
          ))
          : shayari.map((item) => (
            <div key={item._id} className="w-[330px] sm:w-[350px]  shrink-0">
              <Card_2 data={item} />
            </div>
          ))
      }
    </div>
  </div>

  {/* 🔹 SECTION 4 */}
  <div className="w-[85%] mx-auto flex flex-col gap-y-5">
    <h2 className="text-xl sm:text-2xl text-white font-semibold ml-2">Festival Poems</h2>

    <div
      ref={ref4}
      onScroll={() => handleScroll(ref4, "festival")}
      className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {
        loading
          ? Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="w-[350px] shrink-0">
              <SkeletonHomeComponent />
            </div>
          ))
          : festivalSpecial.map((item) => (
            <div key={item._id} className="w-[330px] sm:w-[350px]  shrink-0">
              <Card_2 data={item} />
            </div>
          ))
      }
    </div>
  </div>

</div>
</div>
    </>
  );
};

export default Cards;