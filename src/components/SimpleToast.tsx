
import React, { useState, useEffect } from 'react';
import './SimpleToast.css';

export interface ToastProps {
  id?: number;
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
    <div className="toast-container">
      {toasts.map((toast: ToastProps) => (
        <div 
          key={toast.id}
          className={`toast toast-${toast.type}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
