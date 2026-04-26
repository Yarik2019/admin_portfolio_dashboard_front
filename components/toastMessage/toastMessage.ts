import { toast } from "sonner";

export const ToastSuccess = (message: string) => {
  return toast.success(message);
};

export const ToastError = (message: string) => {
  return toast.error(message);
};

export const ToastWarning = (message: string) => {
  return toast.warning(message);
};

export const ToastInfo = (message: string) => {
  return toast.info(message);
};

export const ToastLoading = (message: string) => {
  return toast.loading(message, { position: "top-left" });
};
