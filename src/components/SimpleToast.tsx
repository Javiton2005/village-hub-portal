
import React, { useState, useEffect } from 'react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export const useSimpleToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: ToastProps) => {
    const id = Date.now();
    const toastWithId = { ...toast, id };
    setToasts(prev => [...prev, toastWithId]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, toast.duration || 3000);
  };

  return {
    toasts,
    success: (message: string, duration?: number) => 
      addToast({ message, type: 'success', duration }),
    error: (message: string, duration?: number) => 
      addToast({ message, type: 'error', duration }),
    info: (message: string, duration?: number) => 
      addToast({ message, type: 'info', duration })
  };
};

export const SimpleToast: React.FC = () => {
  const { toasts } = useSimpleToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast: any) => (
        <div 
          key={toast.id}
          className={`p-4 rounded shadow-md animate-in slide-in-from-top-5 
            ${toast.type === 'success' ? 'bg-green-500 text-white' : 
              toast.type === 'error' ? 'bg-red-500 text-white' : 
              'bg-blue-500 text-white'}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
