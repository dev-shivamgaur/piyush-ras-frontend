import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google"
import { login as serviceLogin } from "../services/user.service";
import { useDispatch, useSelector } from "react-redux"
import { login as storeLogin } from "../store/auth.slice";
import Loader from "./Loader";
import { googleLogin as serviceGoogleLogin } from "../services/user.service";
import { PiCoinsBold } from "react-icons/pi";
import { ErrorToast, SuccessToast } from "./index"

const Login = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const authData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [seenPassword, setSeenPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const sessionRedirect = sessionStorage.getItem("prottectedRouteUrl");;
  const stateRedirect = location.state?.from;
  const redirectTo = stateRedirect ||
    sessionRedirect || "/";
    console.log(sessionRedirect, stateRedirect);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await serviceLogin(data.email, data.password);

    if (response.statusCode === 200) {
      setLoading(false);
      dispatch(storeLogin(response.data));
      reset();

      if (stateRedirect) {
        navigate(stateRedirect, { replace: true });
        sessionStorage.removeItem("prottectedRouteUrl")
        return;
      }

      if (sessionRedirect) {
        navigate(redirectTo)
        sessionStorage.removeItem("prottectedRouteUrl")
        return;
      }

      // navigate("/");
    }


  };

  const handleGoogleLogin = async (authCode) => {
    console.log("hai")
    if (!authCode) {
      console.log("Authcode is required");
      return;
    }
    setLoading(true);
    const res = await serviceGoogleLogin(authCode);

    if (res.statusCode === 404) {
      setLoading(false)
      setError(res.message);
    }

    if (res.statusCode === 200) {
      setLoading(false)
      setSuccess(res.message);
      dispatch(storeLogin(res?.data));

      if (stateRedirect) {
        navigate(stateRedirect, { replace: true });
        sessionStorage.clear("prottectedRouteUrl")
        return;
      }

      if (sessionRedirect) {
        navigate(redirectTo)
        sessionStorage.clear("prottectedRouteUrl")
        return;
      }

      navigate("/");
    }

  }


  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: handleGoogleLogin,
    flow: 'auth-code'
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#8b5a2b_0%,#3d2517_50%,#1a0f0a_100%)] flex items-center">

      <div className="lg:flex lg:w-full w-[92%] mx-auto  rounded-2xl overflow-hidden shadow-lg">

        {/* LEFT IMAGE */}
        <div className="hidden lg:block lg:w-[60%]">
          <img
            src="/main.jpeg"
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT LOGIN */}
        <div className="w-full lg:w-[40%] flex items-center justify-center py-10 lg:pr-5">

          <div className="w-[80%] lg:w-[85%] max-w-md space-y-3">

            {/* Heading */}
            <div className="mb-6  flex flex-col items-start gap-y-2">
              <div className="object-cover  mb-2">
                <img
                  src="/logo.jpeg"
                  className="w-10 h-10 object-cover object-center rounded-full"
                />
              </div>
              <h2 className="text-2xl font-semibold text-yellow-700 items-left">
                Sign in to your account
              </h2>
              <p className="text-sm text-white mt-1 ">
                Not a member?{" "}
                <Link to="/signup">
                  <span className="text-blue-600 text-md cursor-pointer font-bold">Sign up</span>
                </Link>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 shadow-md">

              <div>
                <label className="text-sm text-white">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                  {...register("email", {
                    required: "Email is required"
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

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
                    onClick={() => setSeenPassword(!seenPassword)}
                    className="mr-2" />
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password.message}</p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" {...register("remember")} />
                  Remember me
                </label>
                <span className="text-blue-600 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              {/* Button */}
              <ErrorToast error={error} />
              <SuccessToast success={success} />
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg shadow-md w-full border  border-black text-white 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-transparent hover:bg-yellow-900"}
  `}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="text-center my-4 text-gray-400 text-sm">
              OR
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
      {loading && (
        <Loader />
      )}
    </div>
  );
};

export default Login;