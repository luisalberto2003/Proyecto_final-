// src/components/layout/PageHeader.jsx
import { Leaf, Plus } from 'lucide-react';
import { BaseButton } from '../ui/BaseButton';

export const PageHeader = ({ onAddClick }) => {
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

        {/* BOTÓN DE ACCIÓN REUTILIZABLE */}
        <BaseButton 
          variant="primary" 
          onClick={onAddClick}
          className="!p-3 !rounded-2xl" // Ajuste fino de padding para el icono
        >
          <Plus size={24} />
        </BaseButton>
      </div>
    </header>
  );
};