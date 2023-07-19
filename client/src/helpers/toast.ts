
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message: string, type: string, redirect: string) => {
     if (type === "error no redirect") {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "custom-toast",
        });
    }
    else if (type === "error redirect") {       
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "custom-toast",  
            onClose: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000)); 
              window.location.assign(redirect);
            },
          });
    }
    else if (type === "success no redirect") {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "custom-toast"
        });
    }

    else if (type === "success redirect") {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "custom-toast",  
            onClose: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000)); 
              window.location.assign(redirect);
            },
          });
    }
   
};
