export const FormField = ({ label, error, icon: Icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-wider">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        )}
        <input 
          className={`
            w-full transition-all outline-none border-2 rounded-2xl bg-slate-50
            ${Icon ? 'pl-12 pr-4' : 'px-4'} py-3.5
            ${error 
              ? 'border-red-200 focus:ring-4 focus:ring-red-50 focus:border-red-400' 
              : 'border-transparent focus:ring-4 focus:ring-green-50 focus:border-green-500'
            }
          `}
          {...props} 
        />
      </div>

      {error && (
        <span className="text-red-500 text-xs font-bold ml-1 animate-fade">
          {error}
        </span>
      )}
    </div>
  );
};