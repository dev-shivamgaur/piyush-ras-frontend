
import React from "react";
import { Link } from "react-router-dom";

export default function Card_2({ data}) {
  console.log(data);
  return (
    <Link to={`/read/loggedInUser?lk=${data?._id}`}>
      
      <div className="group p-2 from-[#f7c17c] to-[#e6a85c]   overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        
        {/* Image Section */}
        <div className="relative w-full h-[170px] overflow-hidden">
          <img
            className="w-full h-full object-cover "
            src={data?.thumbnail}
            alt={data?.title ? `${data.title} — हिंदी कविता` : "कविता थंबनेल"}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0  from-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="pt-2 pl-2 sm:p-4 flex flex-col bg-amber-200 justify-between h-[40px] sm:h-[70px]">
          
          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold text-[#7a3e06] font-['Yatra_One'] leading-snug line-clamp-2">
             {data?.title}
          </h2>

          {/* Read More */}
          

        </div>

      </div>

    </Link>
  );
}