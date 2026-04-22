import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { afterSignupGoogleLogin, registerGoogleUser, registerUser } from "../services/user.service";
import Loader from "./Loader";
import {useGoogleLogin} from "@react-oauth/google";
import {ErrorToast, SuccessToast} from "./index";
import { useDispatch } from "react-redux";
import {login as serviceLogin} from "../store/auth.slice"

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [seenPassword, setSeenPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

 

  const onSubmit = async(data) => {
    setLoading(true);
    const res = await registerUser(data.email, data.password, data.avatar[0]);

    if (res.statusCode === 201) {
      setLoading(false);
      setSuccess("Successfully accounted created!")
      reset();
      return;
    }
    if (res.statusCode === 400) {
      setLoading(false);
      setError(res.message);
      return;

    }
 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGoogleLogin = async (authCode) => {
    if (!authCode) {
      console.log("authCode is required");
      return;
    }
    setLoading(true);
    const res = await registerGoogleUser(authCode.code);
    console.log(res);
    if (res.statusCode === 201) {
      setLoading(false);
      setSuccess("Please wait your request is processing!")
      const res2 = await afterSignupGoogleLogin(res.data.email);

      if (res2.statusCode === 200) {
        dispatch(serviceLogin(res2?.data));
        setSuccess("Successfully account created and loggedIn!");
      }
      
      return;
    }

    if (res.statusCode === 400) {
      setLoading(false);
      setError(res.message);
      return;

    }

    if (res.statusCode === 500) {
      setLoading(false);
      setError("This email is exist in the simple registration");
      return;
    }

  }

  const googleLogin = useGoogleLogin({
      onSuccess: handleGoogleLogin,
      onError: handleGoogleLogin,
      flow: 'auth-code'
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] flex items-center">

      <div className="lg:flex lg:w-full w-[92%] mx-auto rounded-2xl overflow-hidden shadow-lg">

        {/* LEFT IMAGE */}
        <div className="hidden lg:block lg:w-[60%]">
          <img
            src="/main.jpeg"
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[40%] flex items-center justify-center py-10 lg:pr-5">

          <div className="w-[80%] lg:w-[85%] max-w-md space-y-3">

            {/* Heading */}
            <div className="mb-6 flex flex-col items-start gap-y-2">
              <div className="object-cover mb-2">
                <img
                  src="/logo.jpeg"
                  className="w-10 h-10 object-cover object-center rounded-full"
                />
              </div>
              <h2 className="text-2xl font-semibold text-yellow-700">
                Create your account
              </h2>
              <p className="text-sm text-white mt-1">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-blue-600 text-md cursor-pointer font-bold">
                    Sign in
                  </span>
                </Link>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit,(error)=>{console.log(error)})} className="space-y-4">

              {/* Profile Image Upload */}
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <label className="text-sm text-white mb-2">
                  Profile Image
                </label>

                <div className="relative cursor-pointer">

                  {/* Hidden Input */}
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    {...register("avatar", {
                      required: "Avatar image is required",
                    onChange: (e)=>handleImageChange(e),
                      validate: {
                        // ✅ Check file type
                        validFormat: (value) => {
                          const file = value?.[0];
                          if (!file) return "Please upload an image";
                          const allowedTypes = ["image/png", "image/jpeg", "image/jpeg"];
                          return allowedTypes.includes(file.type)
                            ? true
                            : "Only .png, .jpg, and .jpeg files are allowed";
                        },

                      },
                    })}
                    className="hidden"
                    id="profileUpload"
                  />

                  {/* Image Preview / Default Avatar */}
                  <label htmlFor="profileUpload">
                    <div className="w-20 h-20 rounded-full border-2  border-amber-700 flex items-center justify-center overflow-hidden hover:opacity-80 transition">

                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-xs text-center px-2">
                          Click to Upload
                        </span>
                      )}

                    </div>
                  </label>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-white">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", 
                    {
                       required: "Email is required",
                        
                      
                      })}
                  className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
            
              <div>
                <label className="text-sm text-white">
                  Password
                </label>
                <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-blue-500">
                <input
                  type={seenPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full mt-1 px-3 py-2  rounded-md outline-none "
                  {...register("password", {
                    required: "Password is required"
                  })}
                />
                <input type="checkbox" {...register("remember")} 
                onClick={()=> setSeenPassword(!seenPassword)}
                className="mr-2" />
                </div>
                
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password.message}</p>
                )}
              </div>

              {/* Button */}
              <ErrorToast error={error} />
              <SuccessToast success = {success} />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 cursor-pointer rounded-md hover:bg-yellow-900 transition"
              >
                Sign up
              </button>
            </form>

            {/* Divider */}
            <div className="text-center my-4 text-gray-400 text-sm">
              or continue with
            </div>

            {/* Google Button */}
            <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-yellow-900"
            onClick={googleLogin}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

          </div>
        </div>
      </div>
      {
        loading && (
          <Loader/>
        )
      }
    </div>
  );
};

export default SignUp;