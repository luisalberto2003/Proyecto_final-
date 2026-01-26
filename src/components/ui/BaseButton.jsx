import { Loader2 } from 'lucide-react';

export const BaseButton = ({ 
  children, 
  label, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  icon: Icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl";
  
  const variants = {
    // Usamos el color personalizado de tu @theme en index.css
    primary: "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-100",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-100",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-green-500 hover:text-green-600"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {label || children}
        </>
      )}
    </button>
  );
};