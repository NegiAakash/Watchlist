import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function sendToast(message, type) {
  if (type === "SUCCESS") {
    toast.success(message, {
      position: "top-right",
      theme: "dark",
      hideProgressBar: true,
    });
  } else {
    toast.error(message, {
      position: "top-right",
      theme: "dark",
      hideProgressBar: true,
    });
  }
}

export default sendToast;
