import React, {useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import {editPoetry, uploadPoetry}  from "../services/poetry.service"
import { createNewAccessToken } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {SuccessToast,ErrorToast} from "./index"
import { useDispatch,useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { startUpload, updateProgress, uploadComplete } from "../store/upload.slice";


export default function KavitaUploadForm({ onClose, editData }) {
  const { register, handleSubmit, reset, formState: { errors }} = useForm();
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async(data) => {
    // setLoader(true);
    const uploadId = uuidv4()
    if (editData) {
      dispatch(startUpload({id: uploadId, title: data?.title, thumbnail: preview}));

      navigate("/uploadProgressPage");

      let res = await editPoetry(editData._id ,data.title,data.content,data.poetryType,data.thumbnail[0], (progress) => {
        dispatch(updateProgress({id:uploadId, progress: progress}));});

     


      if (res.message === "Unauthorized") {
        const res2 = await createNewAccessToken();
  
        if (res2.message === "Session expired, please login!") {
          setLoader(false);
          setError(res2.message);
  
          sessionStorage.setItem(
            "prottectedRouteUrl",
            location.pathname + location.search
          );
  
          navigate("/login");
          return;
        }
  
        if (res2.message === "Access Token is created SuccessFully") {
        res = await uploadPoetry();
          
        }
        if (res?.statusCode === 200) {
          dispatch(uploadComplete({
            id: uploadId,
            poetryId: res?.data?._id,
          }));

          setSuccess("Poetry successfully uploaded..");
          reset();
          return;
        }
      }

      if (res?.statusCode === 200) {
        dispatch(uploadComplete({
          id: uploadId,
          poetryId: res?.data?._id,
        }));
        
        setSuccess("Poetry updated successfully...");
        return;
      }
      return;
    }
    if (!editData) {
      dispatch(startUpload({id: uploadId, title: data?.title, thumbnail: preview}));
      navigate("/uploadProgressPage");

      let res = await uploadPoetry(data.title, data.content, data.poetryType, data.thumbnail[0], data.owner, 
        (progress) => {
        dispatch(updateProgress({id:uploadId, progress: progress}));

      });

      

    if (res.message === "Unauthorized") {
      const res2 = await createNewAccessToken();

      if (res2.message === "Session expired, please login!") {
        setLoader(false);
        setError(res2.message);
        
        sessionStorage.setItem(
          "prottectedRouteUrl",
          location.pathname + location.search
        );

        navigate("/login");
        return;
      }

      if (res2.message === "Access Token is created SuccessFully") {
      res = await uploadPoetry(data.title, data.content, data.poetryType, data.thumbnail[0], data.owner);
        
      }
      if (res?.statusCode === 201) {
        
        dispatch(uploadComplete({
          id: uploadId,
          poetryId: res?.data?._id,
        }));

        setSuccess("Poetry successfully uploaded...");
        // navigate("/dashboard");
        return;
      }
    }
    if (res?.statusCode === 201) {
      dispatch(uploadComplete({
        id: uploadId,
        poetryId: res?.data?._id,
      }));

      setSuccess("Poetry successfully uploaded...");
      // navigate("/dashboard");
    }

    }
    

    

  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

useEffect(() => {
  if (editData) {
    reset({
      title: editData.title,
      content: editData.content,
      poetryType: editData.poetryType,
      writer: editData.ownerName,
    });

    setPreview(editData.thumbnail);
  }
}, [editData, reset]);

  return (
    <div className="relative inset-0 z-50 flex items-center h-full w-full  bg-transparent ">
      <div className="   text-white rounded-2xl p-6 relative shadow-2xl h-full w-full overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-full"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-2xl mb-4 font-semibold text-yellow-500">
          <FaCloudUploadAlt />
        </h2>
        <SuccessToast success = {success}/>
        <ErrorToast error = {error}/>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Image Upload */}
          <div className="flex flex-col items-start">
            <label className="block mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail",{
                required: "Thumbnail is required!"
              })}
              onChange={handleImageChange}
              className="w-full border border-gray-600 p-2 rounded-md"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-3 w-full h-56 object-cover rounded-lg"
              />
            )}
            {errors.thumbnail && (
                  <p className="text-red-500 text-xs">{errors.thumbnail.message}</p>
                )}
          </div>

          <div className="flex flex-col items-start">
            <label className="block mb-2">Poetry Type</label>
            <select
              {...register("poetryType", { required: "Poetrytype is required!" })}
              className="w-full border border-gray-600  p-2 rounded-md bg-transparent"
            >
              <option value="" className="bg-yellow-900">Select Type</option>
              <option value="kavita" className="bg-yellow-900">Kavita</option>
              <option value="longPoem" className="bg-yellow-900">Long Poem</option>
              <option value="shayari" className="bg-yellow-900">Shayari</option>
              <option value="festivalSpecial" className="bg-yellow-900">Festival Special</option>
            </select>
            {errors.poetryType && (
                  <p className="text-red-500 text-xs">{errors.poetryType.message}</p>
                )}
          </div>

          {/* Title */}
          <div className="flex flex-col items-start">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required!" })}
              className="w-full border border-gray-600 p-2 rounded-md bg-transparent"
              placeholder="Enter kavita title"
            />
             {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
          </div>

          {/* Writer */}
          <div className="flex flex-col items-start">
            <label className="block mb-2">Writer Name</label>
            <input
              type="text"
              {...register("writer", { required: "Writer name is required!" })}
              className="w-full border border-gray-600 p-2 rounded-md bg-transparent"
              placeholder="Enter writer name"
            />
            {errors.writer && (
                  <p className="text-red-500 text-xs">{errors.writer.message}</p>
                )}
          </div>

          {/* Kavita Text */}
          <div className="flex flex-col items-start">
            <label className="block mb-2">Kavita</label>
            <textarea
              rows="6"
              {...register("content", { required: "Content is required" })}
              className="w-full border border-gray-600 p-2 rounded-md bg-transparent"
              placeholder="Write your kavita..."
            ></textarea>
             {errors.content && (
                  <p className="text-red-500 text-xs">{errors.content.message}</p>
                )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 py-2 rounded-md font-semibold cursor-pointer"
          >
           {editData ? "Update Kavita" : "Submit Kavita"}
          </button>
        </form>
      </div>
      {
        loader && (
          <Loader/>
        )
      }
    </div>
  );
}