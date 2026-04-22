import { useEffect } from "react";
import toast from "react-hot-toast";

const ErrorToast = ({ error }) => {
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 5000,
        style: {
            background: "#ed9058",
            color: "#fff"
          }
      });
    }
  }, [error]);

  return null;
};

export default ErrorToast;