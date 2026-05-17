import React, { useEffect, useState } from "react";
import { fetchLatestPoetry, fetchPoetryByIdForLoggedInUser } from "../services/poetry.service";
import { useSelector, useDispatch } from "react-redux";
import { processingComplete, removeUpload } from "../store/upload.slice";
import { Link } from "react-router-dom";
import SEO from "./SEO";

const UploadProgressPage = () => {
  const [loading, setLoading] = useState(false);
  const [poetryInfo, setPoetryInfo] = useState([]);
  const uploadData = useSelector((state) => state.upload.uploads);
  const [preview, setPreview] = useState(null);
  const currentUpload = uploadData[0];

  console.log(currentUpload)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPoetryInfo = async () => {
      setLoading(true);
      const res = await fetchLatestPoetry();

      if (res.statusCode === 200) {
        setPoetryInfo(res.data || []);
      }

      setLoading(false);
    };

    fetchPoetryInfo();
  }, []);

  
  useEffect(() => {
    uploadData.forEach(async (u) => {
      if (u.status === "processing") {
        const res = await fetchPoetryByIdForLoggedInUser(u.poetryId);

        if (res?.data?._id) {
          dispatch(processingComplete({ id: u.poetryId }));
        }

        setTimeout(() => {
          dispatch(removeUpload({
            id: u.poetryId,
          }))
        }, 1000);
      }

    });
  }, [uploadData]);

  return (
    <>
    <SEO title="अपलोड प्रगति" path="/uploadProgressPage" noindex />
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6">

      {/* HEADER */}
      {
        currentUpload.status === "ready" ? (<Link
        className = "flex items-center my-2"
        to="/dashboard"
        ><div
        className="px-2 max-w-fit my-2 flex py-1.5 shadow-sm border border-white text-center"
        >
             Go To Dashboard..
        </div>
       </Link>):( <div className="mb-6">
            <h1 className="text-2xl font-bold">Uploading...</h1>
            <p className="text-gray-400 text-sm">
              Upload processing..
            </p>
          </div>)
      }
     

      {/* 🔥 UPLOAD PROGRESS CARD */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg mb-8">
        <div className="flex gap-4 flex-col md:flex-row">

          {/* IMAGE */}
          <img
            src={currentUpload?.thumbnail}
            alt="upload"
            className="w-full md:w-60 h-40 object-cover rounded-xl"
          />

          {/* CONTENT */}
          <div className="flex flex-col justify-between w-full">
            <div>
              <h2 className="text-lg font-semibold">
                {currentUpload?.title || "Uploading Poetry..."}
              </h2>

              
            </div>

            {/* PROGRESS */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{currentUpload?.status}</span>
                <span>{currentUpload?.progress }%</span>
              </div>

              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  style={{ width: `${currentUpload?.progress }%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 LATEST POETRIES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Poetries..</h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {poetryInfo.map((poetry) => (
              <div
                key={poetry._id}
                className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={poetry.thumbnail}
                  alt=""
                  className="h-40 w-full object-cover"
                />

                <div className="p-3">
                  <h3 className="font-semibold text-sm">
                    {poetry.title}
                  </h3>

                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                    {poetry.content}
                  </p>

                  <div className="text-xs text-gray-500 mt-2 flex justify-between">
                    <span>
                      {new Date(poetry.createdAt).toLocaleDateString()}
                    </span>
                    <span>{poetry.views || 0} views</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default UploadProgressPage;