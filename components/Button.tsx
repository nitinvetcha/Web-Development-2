import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:from-pink-600 hover:to-rose-600",
    secondary: "bg-white text-pink-600 hover:bg-pink-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};