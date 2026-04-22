import React from "react";
import { Link } from "react-router-dom";

export default function Card({ data }) {
  return (
    <Link to={`/read/?k=${data?._id}`}>
      
      <div className="group  from-[#f7c17c] to-[#e6a85c] border border-[#8A5A22] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        
        {/* Image Section */}
        <div className="relative w-full h-[180px] overflow-hidden">
          <img
            src={data?.thumbnail || "/main2.png"}
            alt="poetry"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0  from-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="pt-2 pl-2 sm:p-4 flex flex-col bg-amber-200 justify-between h-[50px] sm:h-[100px]">
          
          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold text-[#7a3e06] font-['Yatra_One'] leading-snug line-clamp-2">
            {data?.title || "Untitled Kavita"}
          </h2>

          {/* Read More */}
          

        </div>

      </div>

    </Link>
  );
}