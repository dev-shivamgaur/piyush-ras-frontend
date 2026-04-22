import { useEffect } from "react";
import toast from "react-hot-toast";

const SuccessToast = ({ success }) => {
  useEffect(() => {
    if (success) {
      toast.success(success, {
        duration: 4000,
        style: {
            background: "#ffffff",
            color: "#00000"
          }
      });
    }
  }, [success]);

  return null;
};

export default SuccessToast;