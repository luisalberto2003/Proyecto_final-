export const StatusBadge = ({ label, variant = 'default' }) => {
  const styles = {
    default: "bg-slate-100 text-slate-500",
    success: "bg-green-100 text-green-600",
    warning: "bg-orange-100 text-orange-600",
    info: "bg-blue-100 text-blue-600",
    danger: "bg-red-100 text-red-600"
  };

  return (
    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${styles[variant] || styles.default}`}>
      {label}
    </span>
  );
};