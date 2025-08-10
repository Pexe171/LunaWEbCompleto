import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000; // Increased delay to 1000s for persistence

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
} & (
  | {
      variant: "default";
    }
  | {
      variant: "destructive";
    }
) & {
    onOpenChange?: (open: boolean) => void;
  };

const toast = (() => {
  let toasts: ToasterToast[] = [];
  const listeners: ((toasts: ToasterToast[]) => void)[] = [];

  const addToast = (toast: ToasterToast) => {
    toasts = [toast, ...toasts].slice(0, TOAST_LIMIT);
    listeners.forEach((listener) => listener(toasts));
    return toast.id;
  };

  const updateToast = (id: string, update: Partial<ToasterToast>) => {
    toasts = toasts.map((t) => (t.id === id ? { ...t, ...update } : t));
    listeners.forEach((listener) => listener(toasts));
  };

  const removeToast = (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    listeners.forEach((listener) => listener(toasts));
  };

  const subscribe = (listener: (toasts: ToasterToast[]) => void) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };

  const fire = (toast: Omit<ToasterToast, "id">) => {
    const id = Date.now().toString();
    addToast({ ...toast, id });
    setTimeout(() => removeToast(id), TOAST_REMOVE_DELAY);
    return id;
  };

  return { fire, subscribe, toasts };
})();

function useToast() {
  const [toasts, setToasts] = React.useState(toast.toasts);

  React.useEffect(() => {
    return toast.subscribe(setToasts);
  }, []);

  return {
    ...toast,
    toasts,
    toast: toast.fire,
  };
}

export { useToast, toast };
