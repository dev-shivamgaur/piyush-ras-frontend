import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PiBookBookmarkLight, PiHeartBold } from "react-icons/pi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { fetchPoetryById, fetchPoetryByIdForLoggedInUser } from "../../services/poetry.service";
import { createNewAccessToken } from "../../services/user.service";
import { useNavigate, useLocation } from "react-router-dom";
import { CommentSection, ErrorToast } from "../index"
import { fetchBookMarkStatus, toggleBookMark } from "../../services/bookmark.service";
import { IoBookmarks, IoBookmarksOutline } from "react-icons/io5";
import { socket } from "../../../socket";
import { fetchCommentReactionStatus, fetchPoetryReactionStatus, toggleRaction } from "../../services/reaction.service";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import SEO, { buildArticleSchema } from "../SEO";
import { SITE_URL } from "../../config/seo.config";

const KavitaCard = () => {
  const [params] = useSearchParams();
  const kavitaId = params.get("k");
  const loggedInUserKavitaId = params.get("lk");
  const [poetryInfo, setPoetryInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookmarkStatus, setBookMarkStatus] = useState(false);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const poetryId = loggedInUserKavitaId || kavitaId;
  const authData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchPoetryInfoById = async () => {

      setLoading(true);
      let res
      if (kavitaId) {
        res = await fetchPoetryById(kavitaId);
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
            res = await fetchPoetryByIdForLoggedInUser(loggedInUserKavitaId);

          }

        }
        if (res.statusCode === 200) {
          setPoetryInfo(res.data);
          setLoading(false);
        }

      } else if (loggedInUserKavitaId) {
        res = await fetchPoetryByIdForLoggedInUser(loggedInUserKavitaId);
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
            res = await fetchPoetryByIdForLoggedInUser(loggedInUserKavitaId);

          }

        }
        if (res.statusCode === 200) {
          setPoetryInfo(res.data);
          setLoading(false);
        }
        return;
      }

    }
    fetchPoetryInfoById();
  }, []);

  const handleBookMark = async () => {
    if (bookmarkStatus) {
      setBookMarkStatus(false);
    } else {
      setBookMarkStatus(true);
    }
    let res = await toggleBookMark(poetryInfo?._id);
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
        res = await toggleBookMark(poetryInfo?._id);

      }

    }

    if (res.statusCode === 200) {
      setBookMarkStatus(false);

    }

    if (res.statusCode === 201) {
      setBookMarkStatus(true);
    }

  }

  useEffect(() => {
    if (loggedInUserKavitaId) {
      setBookMarkStatus(false);

      const fetchStatusForBookMark = async () => {
        let res = await fetchBookMarkStatus(poetryInfo?._id);
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
            res = await fetchBookMarkStatus(poetryInfo?._id);

          }
        }
        if (res.statusCode === 200) {

          if (res.message === "BookMark is succeefully find!") {

            setBookMarkStatus(true);
            return;
          }
          setBookMarkStatus(false);

        }

      }
      fetchStatusForBookMark();
    }

  }, [loading === false]);

 
  

  const toggleLike = async() => {
    if (authData) {
      
      if (like) {
        setLike(false);
      } else {
        setLike(true);
      }
      
      let res = await toggleRaction(poetryId, "like");
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
          res = await await toggleRaction(poetryId, "like");

        }
      }

      if (res.statusCode === 200) {
        if (res.message === "Poetry is successfully liked") {
          setLike(true);
          return
        }
        if (res.message === "Reaction is successfully deleted for Reaction collection.") {
          setLike(false);
        }
      }
      
    } else {
      navigate("/login");
    }
  }

  useEffect(()=>{

    const fetchPoetryReac = async() => {
      if (authData) {
      let res = await fetchPoetryReactionStatus(poetryId);
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
          res = await fetchPoetryReactionStatus(poetryId);

        }
      }
      if (res.statusCode === 200) {
        if (res.message === "Reaction can not find!") {
          setLike(false);
          return;
        }

        if(res.message === "Reaction is successfully fetched"){
          setLike(true);
          return;
        }
      }
      }
    }
    fetchPoetryReac();
    
  },[])

  const readPath = kavitaId
    ? `/read?k=${kavitaId}`
    : loggedInUserKavitaId
      ? `/read/loggedInUser?lk=${loggedInUserKavitaId}`
      : "/read";

  const poemDescription = poetryInfo?.content
    ? poetryInfo.content.replace(/\s+/g, " ").trim().slice(0, 160)
    : undefined;

  const articleSchema =
    poetryInfo?.title
      ? buildArticleSchema({
          title: poetryInfo.title,
          description: poemDescription,
          image: poetryInfo.thumbnail,
          url: `${SITE_URL}${readPath}`,
          datePublished: poetryInfo.createdAt,
          author: poetryInfo.ownerName,
        })
      : undefined;

  return (
    <>
    <SEO
      title={poetryInfo?.title || "कविता पढ़ें"}
      description={poemDescription}
      path={readPath}
      image={poetryInfo?.thumbnail}
      type="article"
      jsonLd={articleSchema}
    />
    <div className="min-h-screen  flex justify-center ">
      <div
        className="w-full   bg-[#D7B78D] overflow-hidden relative"
        style={{
          backgroundImage:
            "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0  backdrop-blur-sm"></div>

        <div className="relative w-[85%] mx-auto sm:p-10">
          {
            loading ? (<SkeletonVideoCard />) : (<div className="flex flex-col  gap-y-1 md:gap-y-5 mt-3">
              <h1 className="text-3xl sm:text-4xl text-[#8B2E26] mb-2 font-bold font-['Yatra_One']">
                {poetryInfo.title}
              </h1>

              <div className="sm:flex justify-between items-center">
                <p className="text-blue-600 text-md  hover:underline cursor-pointer">
                  {poetryInfo?.ownerName}
                </p>
                <div className=" flex items-center gap-6  mt-5 sm:mt-0 text-gray-600 ">
                  <div className=" transition flex items-center gap-x-5 sm:gap-x-3 cursor-pointer"
                  onClick={toggleLike}
                  >
                    {
                      like ?(<FaHeart className = "w-6 h-6"/>) :(<PiHeartBold className="w-6 h-6 hover:text-orange-600" />)
                    }
                    
                  </div>
                  <div className=" transition flex items-center gap-x-3 cursor-pointer">
                    {/* <FaRegShareFromSquare className="w-6 h-6" /> */}
                  </div>
                  <div className=" transition flex items-center gap-x-3 cursor-pointer"
                    onClick={handleBookMark}
                  >
                    {
                      bookmarkStatus ? (<IoBookmarks className="w-6 h-6 stroke-[2.5]" />) : (<IoBookmarksOutline className="w-6 h-6 stroke-[2.5] " />)
                    }

                  </div>
                </div>
              </div>
              <div className="h-px bg-yellow-600 w-full  "></div>
            </div>)
          }



          <div className="text-gray-800 text-lg sm:text-2xl mt-2 leading-9 space-y-2  font-medium">
            <pre className="whitespace-pre-wrap font-['Ranga'] text-2xl sm:text-xl md:text-2xl leading-relaxed tracking-wide"
              onCopy={(e) => (e.preventDefault(
                setError("Copy can not allowed")
              ))}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              {poetryInfo.content}
            </pre>
            <ErrorToast error={error} />
          </div>
          <CommentSection 
          poetryId = {poetryId}
          />
        </div>
      </div>
    </div>
    </>
  );
};

function SkeletonVideoCard() {
  return (
    <div className="w-full h-full flex flex-col gap-y-4 z-30 mt-5 sm:mt-2">
      <div className="w-full h-[20px] animate-pulse bg-yellow-800 rounded-md"></div>
      <div className="w-full h-[20px] animate-pulse bg-yellow-800 rounded-md"></div>
      <div className="w-full h-[200px] animate-pulse bg-yellow-800 rounded-lg"></div>
    </div>
  )

}

export default KavitaCard;

