// src/components/layout/PageHeader.jsx
import { Leaf, Plus, LogOut } from 'lucide-react';
import { BaseButton } from '../ui/BaseButton';

export const PageHeader = ({ onAddClick, user, onLogout }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-xl text-white shadow-lg shadow-green-100">
            <Leaf size={20} />
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight italic">
            Huerto<span className="text-green-600">UP</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* SECCION DE USUARIO */}
          {user && (
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-slate-700">{user.name || 'Usuario'}</span>
              <span className="text-[10px] text-slate-400">{user.email}</span>
            </div>
          )}

          <BaseButton 
            variant="ghost"
            onClick={onLogout}
            className="!px-3 !py-2 text-slate-600"
            title="Cerrar sesion"
          >
            <LogOut size={18} />
          </BaseButton>

          {/* BOTON DE ACCION REUTILIZABLE */}
          <BaseButton 
            variant="primary" 
            onClick={onAddClick}
            className="!p-3 !rounded-2xl" // Ajuste fino de padding para el icono
          >
            <Plus size={24} />
          </BaseButton>
        </div>
      </div>
    </header>
  );
};
