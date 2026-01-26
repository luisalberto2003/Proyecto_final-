export const HydrationBar = ({ percentage }) => {
  const isLow = percentage < 30;
  const isCritical = percentage < 15;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
          Hidratación
        </span>
        <span className={`text-[10px] font-bold ${isCritical ? 'text-red-500 animate-pulse' : 'text-blue-500'}`}>
          {percentage}%
        </span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${
            isLow ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-blue-400 to-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};