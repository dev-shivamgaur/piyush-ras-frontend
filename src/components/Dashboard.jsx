import React, { useCallback, useEffect, useState } from "react";
import { FiMenu, FiX, FiTrash2, FiEdit } from "react-icons/fi";
import KavitaUploadForm from "./KavitaUploadForm";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useRef } from "react";
import { deletePoetry, getDashboardPoetry } from "../services/poetry.service";
import { createNewAccessToken } from "../services/user.service";
import {SkeletonHomeComponent} from "./Home"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, sethashMore] = useState(true);
  const [poetryInfo, setPoetryInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoetry, setSelectedPoetry] = useState({});
  const loaderRef = useRef(null);
  const isFetchingRef = useRef(false);
  const scrollContainerRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const limit = 2;
  const navigate = useNavigate();
  const location = useLocation();
  
  const fetchPoetryes = useCallback(async() => {
    isFetchingRef.current = true;
    setLoading(true);
    let res = await getDashboardPoetry(page, limit);

    if (res.message === "Unauthorized") {
      const res2 = await createNewAccessToken();

      if (res2.message === "Session expired, please login!") {
        // setError(res2.message);

        sessionStorage.setItem(
          "prottectedRouteUrl",
          location.pathname + location.search
        );

        navigate("/login");
        return;
      }

      if (res2.message === "Access Token is created SuccessFully") {
      res = await getDashboardPoetry(page, limit)
        
      }

    }

    if (res?.statusCode === 200) {
      const newPoetry = res.data.result[0].data;
      setPoetryInfo((prev) => {
        const uniqueVideos = newPoetry.filter(
          (newVideo) =>
            !prev.some((oldVideo) => oldVideo._id === newVideo._id)
        );
        return [...prev, ...uniqueVideos];
      });
      let totalPage = res.data.totalPage;
      if (page >= totalPage) {
        sethashMore(false);
       
      } else {
        setPage((prev) => prev+1);
      }
      setLoading(false);
      isFetchingRef.current = false;
      return;
    }
  },[page, sidebarOpen, hasMore]);
  

  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=> {
      if (entries[0].isIntersecting) {
        fetchPoetryes();
      }
    },
    {
      root: sidebarOpen ? mobileScrollRef.current: scrollContainerRef.current, 
      threshold: 1,
    })

    const loaderElement = loaderRef.current;
    if (loaderElement) {
      observer.observe(loaderElement);
    }

    return () => {
      if (loaderElement) {
        observer.unobserve(loaderElement);
      }
    };

  },[fetchPoetryes]);

  useEffect(()=>{
    fetchPoetryes();
  },[]);

  const handleEdit = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPoetry(item);
    setShowForm(true);
    setSidebarOpen(false)

  }

  const handleDelete = async (e, item) => {
    console.log(item)
    e.preventDefault();
    e.stopPropagation();
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-sm bg-yellow-800 text-white w-[400px] h-[300px]",
        title: "text-yellow-400 text-xl",
        confirmButton: "bg-red-500 px-4 py-2 rounded-md",
        cancelButton: "bg-gray-500 px-4 py-2 rounded-md",
        icon :"w-[50px] h-[50px]"
      }
    });
    if (result.isConfirmed) {
      let res = await deletePoetry(item._id);
      if (res.message === "Unauthorized") {
        const res2 = await createNewAccessToken();
  
        if (res2.message === "Session expired, please login!") {
  
          sessionStorage.setItem(
            "prottectedRouteUrl",
            location.pathname + location.search
          );
  
          navigate("/login");
          return;
        }
  
        if (res2.message === "Access Token is created SuccessFully") {
        res = await deletePoetry(item._id);
          
        }
  
      }
  
      if (res?.statusCode === 200) {
        Swal.fire({
          title: "Deleted!",
          text: "Kavita delete ho gayi.",
          icon: "success",
        });
  
        // UI update
        setPoetryInfo((prev) =>
          prev.filter((saveItem) => saveItem._id !== item._id)
        );
      }
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] text-white p-4"
    ref = {scrollContainerRef}
    >
      {/* Top bar for mobile */}
      <div className="md:hidden  flex items-center justify-between mb-4">
        <button onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>
        <h1 className="text-md cursor-pointer flex items-center gap-x-3"><h1>Upload</h1> <MdOutlineCloudUpload className="w-5 h-5"/></h1>
      </div>

      <div className="flex gap-4">
        {/* Sidebar (desktop) */}
        <div className="hidden md:flex flex-col md:w-[30%] lg:w-[20%] border border-gray-600 rounded-xl p-3 h-[80vh] overflow-y-auto">
          <button className="border border-gray-500 rounded-md p-2 mb-4">
            All Kavita
          </button>

          {
        !loading &&
        poetryInfo.map((item) => (
          <Link
          to = {`/read/loggedInUser?lk=${item?._id}`}>
          <div
          key={item._id}
          className="border border-gray-600  bg-[#f7c17c] rounded-lg p-2 mb-3 relative group w-[90%]"
        >
          <div className="absolute left-4 top-4 cursor-pointer opacity-100 bg-blue-400 rounded-full p-2 w-fit" >
          <FiEdit size={18}  onClick={(e)=>handleEdit(e, item)}/>
          </div>
          <div className="absolute top-4 right-4 cursor-pointer opacity-100 bg-red-400 rounded-full p-2">
            <FiTrash2 size={18} onClick={(e)=>handleDelete(e, item)}/>
          </div> 
          <div className="w-full h-full flex flex-col items-left">
            <div className=" w-full h-[170px] ">
            <img
      className="w-full h-full object-cover object-center"
      src={item?.thumbnail}
      alt="card"
    />
          </div>
          <div className="pt-2 pl-2 sm:p-4 flex flex-col bg-amber-200 justify-between h-[40px] sm:h-[70px]">
          <h2 className="text-xl font-extrabold text-[#f18034]  font-['Yatra_One']">
      {item?.title}
    </h2>
    </div>
          </div>
        </div>
        </Link>
        ))
        
        }
        {
          loading &&
          Array.from({length:6},(_,i)=>(  <div key={i} className="mb-3 w-[90%]">
            <SkeletonHomeComponent />
          </div>))
        }
           {hasMore && (
            <div
              ref={loaderRef}
              className="flex justify-center py-6"
            >
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 shadow-md rounded-xl flex items-center border border-dashed justify-center h-[80vh]">
        
          {
            !showForm && ( <button onClick={() => (setShowForm(true),
              setSelectedPoetry(null))
            } className="border border-gray-400 px-6 py-3 rounded-md hover:bg-gray-800 cursor-pointer">
            Upload Kavita
          </button>)
          }
      {showForm && <KavitaUploadForm onClose={() => setShowForm(false)} editData = {selectedPoetry} />}
        </div>
        
      </div>

      {/* Mobile Sidebar Overlay */}
      {/* Mobile Sidebar Overlay */}
{sidebarOpen && (
  <div className="fixed inset-0 z-50 flex md:hidden"
  ref ={mobileScrollRef}
  >
    {/* Dark Background Overlay (Blur effect) */}
    <div 
      className="absolute inset-0 bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] backdrop-blur-sm"
      onClick={() => setSidebarOpen(false)}
    ></div>

    {/* Sidebar Content */}
    <div className="relative w-[80%] sm:w-[60%] bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] border-r border-gray-600 h-full flex flex-col p-4 shadow-2xl animate-in slide-in-from-left duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-yellow-500">मेरी कविताएं</h2>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Scrollable List Area */}
      <div className="overflow-y-auto flex-1 no-scrollbar">
        <button className="w-full border border-gray-500 rounded-md p-2 mb-6 hover:bg-gray-800 transition-all">
          All Kavita
        </button>

        {
        !loading &&
        poetryInfo.map((item) => (
          <Link
          to = {`/read/loggedInUser?lk=${item?._id}`}>
          <div
          key={item._id}
          className="border border-gray-600  bg-[#f7c17c] rounded-lg p-2 mb-3 relative group w-[90%]"
        >
          <div className="absolute left-4 top-4 cursor-pointer opacity-100 bg-blue-400 rounded-full p-2 w-fit" >
            <FiEdit size={18}  onClick={(e)=>handleEdit(e, item)}/>
          </div>
          <div className="absolute top-4 right-4 cursor-pointer opacity-100 bg-red-400 rounded-full p-2 ">
            <FiTrash2 size={18}  onClick={(e)=>handleDelete(e, item)}/>
          </div>
          <div className="w-full h-full flex flex-col items-left">
            <div className=" w-full h-[170px] ">
            <img
      className="w-full h-full object-cover object-center"
      src={item?.thumbnail}
      alt="card"
    />
          </div>
          <div className="pt-2 pl-2 sm:p-4 flex flex-col bg-amber-200 justify-between h-[40px] sm:h-[70px]">
          <h2 className="text-xl font-extrabold text-[#f18034]  font-['Yatra_One']">
      {item?.title}
    </h2>
    </div>
          </div>
        </div>
        </Link>
          
        ))
        
        }
        {
          loading &&
          Array.from({length:6},(_,i)=>(  <div key={i} className="mb-3 w-[90%]">
            <SkeletonHomeComponent />
          </div>))
        }
         {hasMore && (
            <div
              ref={loaderRef}
              className="flex justify-center py-6"
            >
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          )}
      </div>
    </div>
   
  </div>
)}
 
    </div>
  );
}


