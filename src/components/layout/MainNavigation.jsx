// src/components/layout/MainNavigation.jsx
export const MainNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'huerto', label: 'Mi Huerto' },
    { id: 'guia', label: 'Guía Pro' },
    { id: 'plagas', label: 'Doctor' }
  ];

  return (
    <nav className="flex justify-center my-8">
      <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 shadow-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all duration-300
              ${activeTab === tab.id 
                ? 'bg-white text-green-600 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};