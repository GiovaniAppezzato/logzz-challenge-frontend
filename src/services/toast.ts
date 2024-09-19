import { toast as toastify } from "react-toastify";

export default class ToastService {
  static show(message: string, type: "success" | "warning" | "error") {
    switch (type) {
      case "success":
        this.success(message);
        break;
      case "warning":
        this.warning(message);
        break;
      case "error":
        this.error(message);
        break;
    }
  }

  static success(message: string) {
    toastify.success(message, { theme: "colored" });
  }

  static warning(message: string) {
    toastify.warning(message, { theme: "colored" });
  }

  static error(message: string) {
    toastify.error(message, { theme: "colored" });
  }

  static dark(message: string) {
    toastify.dark(message, { autoClose: 15000, progressStyle: { background: "#2fde91" } });
  }
}