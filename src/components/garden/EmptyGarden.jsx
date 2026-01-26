// src/components/garden/EmptyGarden.jsx
import { Sprout, Plus } from 'lucide-react';
import { BaseButton } from '../ui/BaseButton';

export const EmptyGarden = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-4xl border-2 border-dashed border-slate-100 animate-fade text-center">
      <div className="bg-green-50 p-8 rounded-full text-green-600 mb-8 shadow-inner">
        <Sprout size={48} />
      </div>
      
      <h3 className="text-2xl font-black text-slate-800 mb-3">
        Tu huerto está esperando
      </h3>
      
      <p className="text-slate-500 max-w-xs mb-10 leading-relaxed">
        Todavía no tienes ninguna planta registrada. ¡Añade tu primera semilla y comienza a verla crecer!
      </p>
      
      <BaseButton 
        variant="primary"
        label="Añadir mi primera planta" 
        icon={Plus}
        onClick={onAddClick}
        className="shadow-2xl shadow-green-200"
      />
    </div>
  );
};