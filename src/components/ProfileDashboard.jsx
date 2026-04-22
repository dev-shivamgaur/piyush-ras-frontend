import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { RiHeart2Fill } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {createNewAccessToken, logout as serviceLogout, userProfile} from "../services/user.service"
import { logout as storeLogout } from "../store/auth.slice";
import {ErrorToast} from "./index"
import {useNavigate, useLocation} from "react-router-dom"
import { useEffect } from "react";
import { deleteBookMark, fetchAllBookMark } from "../services/bookmark.service";
import { IoBookmarksOutline } from "react-icons/io5";
import { deleteReaction, fetchAllLikedPoetry } from "../services/reaction.service";
import { Helmet } from "react-helmet-async";
// import { AiFillHeart } from "react-icons/ai";


// const data = [
//   {
//     title: "भक्ति रस",
//     desc: "कुछ पंक्तियाँ यहाँ दिखाई जाएंगी...",
//     img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
//   },
//   {
//     title: "गुजरा वक्त",
//     desc: "कुछ पंक्तियाँ यहाँ दिखाई जाएंगी...",
//     img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//   },
//   {
//     title: "पीड़ा भर",
//     desc: "कुछ पंक्तियाँ यहाँ दिखाई जाएंगी...",
//     img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//   },
// ];

const Card = ({ item, type, onDelete }) => {

  const handleDeleteLike = async(e, likedId) => {
    e.preventDefault();
    e.stopPropagation();
    let res = await deleteReaction(likedId);
    if (res.message === "Unauthorized") {
      const res2 = await createNewAccessToken();

      if (res2.message === "Session expired, please login!") {
        setError(res2.message);

        sessionStorage.setItem(
          "prottectedRouteUrl",
          location.pathname + location.search
        );

        navigate("/login");
        return;
      }

      if (res2.message === "Access Token is created SuccessFully") {
      res = await deleteReaction(likedId);
        
      }

    }

    if (res.statusCode === 200) {
      onDelete(likedId);
    }

  }

  const handleDeleteBookMark = async(e, bookMarkId) => {
    e.preventDefault();
    e.stopPropagation();
    let res = await deleteBookMark(bookMarkId);
    if (res.message === "Unauthorized") {
      const res2 = await createNewAccessToken();

      if (res2.message === "Session expired, please login!") {
        setError(res2.message);

        sessionStorage.setItem(
          "prottectedRouteUrl",
          location.pathname + location.search
        );

        navigate("/login");
        return;
      }

      if (res2.message === "Access Token is created SuccessFully") {
      res = await deleteBookMark(bookMarkId);
        
      }

    }

    if (res.statusCode === 200) {
      onDelete(bookMarkId);
    }
  }
  return (
    <Link
    to = {`/read/loggedInUser?lk=${item?.poetryId}`}
    >
    <div className="flex items-center gap-4 p-4 rounded-xl bg-transparent border border-gray-700 hover:border-yellow-500 transition-all cursor-pointer">
      <img
        src={item.thumbnail}
        alt="img"
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="text-lg text-yellow-500 font-semibold">
          {item.title}
        </h3>
        
      </div>

      <div className="text-yellow-500 text-xl">
        {type === "bookmark" ? (<FaBookmark onClick={(e)=>handleDeleteBookMark(e,item._id)}/>) : (<AiFillHeart onClick={(e)=>handleDeleteLike(e,item._id)}/>)}
      </div>
    </div>
    </Link>
  );
};

function ProfileSkeleton() {
  return (
    <div className="flex h-full w-full gap-x-3 mb-5 justify-between">
      <div
    className='h-[100px] w-[100px] animate-pulse bg-yellow-800 rounded-full'
    ></div>
    <div className="flex flex-col gap-y-3 w-full mt-5">
      <div className="w-3/4 sm:w-1/2 h-[20px] animate-pulse bg-yellow-800 rounded-md"></div>
      <div className="w-3/4 sm:w-1/2 h-[20px] animate-pulse bg-yellow-800 rounded-md"></div>
    </div>
    </div>
    
   );
}

 function ProfileDashboard() {
  const authData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const [logoutbutton, setlogoutbutton] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [bookMarkLoading, setBookMarkLoading] = useState(true);
  const [bookMarkInfo, setBookMarkInfo] = useState([]);
  const [reactionLoading, setReactionLoading] = useState(true);
  const [reactionInfo, setReactionInfo] = useState([]);
  const location = useLocation();

  useEffect(()=>{

    const fetchUserInfo = async() => {
      setLoading(true);
      let res = await userProfile();

      if (res.message === "Unauthorized") {
        const res2 = await createNewAccessToken();
  
        if (res2.message === "Session expired, please login!") {
          setError(res2.message);

          sessionStorage.setItem(
            "prottectedRouteUrl",
            location.pathname + location.search
          );

          navigate("/login");
          return;
        }
  
        if (res2.message === "Access Token is created SuccessFully") {
        res = await userProfile();
          
        }
  
      }

      if (res?.statusCode === 200) {
        setUserInfo(res?.data);
        setLoading(false);
        return;
      }
    }

    fetchUserInfo();

  },[])

  useEffect(()=>{

    const fetchBookMarkDetails = async () => {

      setBookMarkLoading(true);
      let res = await fetchAllBookMark();
      if (res.message === "Unauthorized") {
        const res2 = await createNewAccessToken();
  
        if (res2.message === "Session expired, please login!") {
          setError(res2.message);

          sessionStorage.setItem(
            "prottectedRouteUrl",
            location.pathname + location.search
          );

          navigate("/login");
          return;
        }
  
        if (res2.message === "Access Token is created SuccessFully") {
        res = await fetchAllBookMark();
          
        }
  
      }

      if (res?.statusCode === 200) {
        // console.log(res);
        setBookMarkInfo(res?.data);
        setBookMarkLoading(false);
        return;
      }
    }

    const fetchReactionDetails = async () => {
      setReactionLoading(true);
      let res = await fetchAllLikedPoetry();
      if (res.message === "Unauthorized") {
        const res2 = await createNewAccessToken();
  
        if (res2.message === "Session expired, please login!") {
          setError(res2.message);

          sessionStorage.setItem(
            "prottectedRouteUrl",
            location.pathname + location.search
          );

          navigate("/login");
          return;
        }
  
        if (res2.message === "Access Token is created SuccessFully") {
        res = await fetchAllLikedPoetry();
          
        }
  
      }

      if (res?.statusCode === 200) {
        // console.log(res);
        setReactionInfo(res?.data);
        setReactionLoading(false);
        return;
      }
    }
    
    fetchBookMarkDetails();

    fetchReactionDetails();

  },[])

  const handleLogout = async() => {
    setlogoutbutton(true)
     let res = await serviceLogout();
    //  console.log(res);
    if (res.message === "Unauthorized") {
      const res2 = await createNewAccessToken();

      if (res2.message === "Session expired, please login!") {
        setError(res2.message);
        navigate("/login");
        return;
      }

      if (res2.message === "Access Token is created SuccessFully") {
      res = await serviceLogout();
        
      }

    }
     if (res.statusCode === 200) {
      setlogoutbutton(false);
      dispatch(storeLogout());
      navigate("/login");

     }
  }

  return (
    <>
    <Helmet>
    <title>{`Piyush Ras - ${userInfo?.fullName || "Loading..."}`}</title>
  <meta
    name="description"
    content={"Best Hindi poetry platform"}
  />
      </Helmet>
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] text-white p-4 md:p-8">
      {
        loading ? (<ProfileSkeleton/>) : (
          <div className=" block sm:flex items-center gap-4 p-4 rounded-2xl bg-transparent border border-gray-700 mb-8 justify-between">
        <div className="flex items-center gap-4">
        <img
          src={userInfo.avatar}
          alt="profile"
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="min-w-0"> 
          <h2 className="text-xl font-semibold">{userInfo?.fullName}</h2>
          <p className=" w-full overflow-clip text-gray-400 text-sm  wrap-break-all">{userInfo?.email}</p>
          <p className="text-gray-500 text-xs">{userInfo?.isisGoogleUser ? "Google Account":"Normal Account"}</p>
        </div>
        </div>
        {
         authData?.email == adminEmail ?(
          <div className="flex items-center justify-between sm:gap-x-4">
             <div className="  flex justify-center mt-4 sm:mt-0 shadow-md rounded-md border border-gray-700 ">
             <button className={`py-2 px-4 ${logoutbutton ? "cursor-progress" : "cursor-pointer"}`}
          onClick={handleLogout}
          disabled = {logoutbutton}
          >Logout</button>
        </div>
        <div className="flex justify-center mt-4 sm:mt-0 shadow-md rounded-md border border-gray-700 cursor-pointer ">
          <Link
          to = "/dashboard"
          >
          <button className="cursor-pointer py-2 px-4 ">Dashboard</button>
          </Link>
        </div>
          </div>
         ):(<div className="flex justify-center mt-4 sm:mt-0 shadow-md rounded-md border border-gray-700  ">
          <button className={`py-2 px-4 ${logoutbutton ? "cursor-progress ":"cursor-pointer"}`}
          onClick={handleLogout}
          >Logout</button>
        </div>)
        }
        
      </div>
        )
      }
      

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bookmark Section */}
        <div>
            <div className="flex items-center gap-x-4 mb-4">
            <FaBookBookmark className="h-5 w-5"/> 
            <h2 className="text-xl text-yellow-500 ">
          Kavita
          </h2>
            </div>
         

          <div className="space-y-4">
            {
            bookMarkLoading? Array.from({length: 4},(_,i)=>(
              <BookMarkSkeleton key = {i}/>
            )):
            bookMarkInfo.length > 0 ? bookMarkInfo.map((item, i) => (
              <Card key={i} item={item} type="bookmark"  onDelete={(bookMarkId) => {
                setBookMarkInfo(prev => prev.filter(b => b._id !== bookMarkId));
              }}/>
            )):
            (
            <div className="flex flex-col items-center gap-y-2 ">
              <IoBookmarksOutline className="w-10 h-10 stroke-[2.5] " />
              <p className=" flex text-center text-wrap">Your bookMark collection is empty..</p>
              <Link
              to="/allKavita"
              >
              <button className="px-3  py-2 bg-transparent shadow-md">Explore Kavita</button>
              </Link>
            </div>
            )
            }
          </div>
        </div>

        {/* Liked Section */}
        <div className="">
            <div
            className="flex  items-center gap-x-4 mb-4"
            ><RiHeart2Fill className="h-6 w-6"/>
            <h2 className="text-xl text-yellow-500 ">
             Kavita
          </h2>
            </div>
            <ErrorToast error = {error} />
            
          

          <div className="space-y-4">
            {
            reactionLoading? Array.from({length: 4},(_,i)=>(
              <BookMarkSkeleton key = {i}/>
            )):
            reactionInfo?.length > 0 ?
            reactionInfo.map((item, i) => (
              <Card key={i} item={item} type="like" onDelete={(reactionId) => {
                setReactionInfo(prev => prev.filter(b => b._id !== reactionId));
              }}/>
            )):
            (<div className="flex flex-col items-center gap-y-2 ">
              <AiFillHeart className="w-10 h-10 stroke-[2.5] " />
              <p className=" flex text-center text-wrap">Your Liked collection is empty..</p>
              <Link
              to="/allKavita"
              >
              <button className="px-3  py-2 bg-transparent shadow-md">Explore Kavita</button>
              </Link>
            </div>)
            }
          </div>
        </div>
      </div>
    </div>
    </>
  );
}



function BookMarkSkeleton(){
  return (
    <div className="w-full h-[100px] p-4 rounded-xl animate-pulse bg-yellow-800 "></div>
  )
}

export default ProfileDashboard;
