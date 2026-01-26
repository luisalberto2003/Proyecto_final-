// src/components/garden/PlantCard.jsx
import { Trash2, Droplets, Calendar } from 'lucide-react';
import { BaseButton } from '../ui/BaseButton';
import { HydrationBar } from '../ui/HydrationBar';
import { StatusBadge } from '../ui/StatusBadge';

export const PlantCard = ({ plant, onWater, onDelete }) => {
  // Determinamos el color del badge según la hidratación
  const getStatusVariant = () => {
    if (plant.hydration < 20) return 'danger';
    if (plant.hydration < 50) return 'warning';
    return 'success';
  };

  return (
    <div className="bg-white rounded-4xl p-7 border border-slate-50 shadow-sm hover:shadow-xl transition-all animate-fade group">
      <div className="flex justify-between items-start mb-6">
        <StatusBadge 
          label={plant.type} 
          variant={getStatusVariant()} 
        />
        <BaseButton 
          variant="ghost" 
          size="sm" 
          icon={Trash2} 
          onClick={() => onDelete(plant.id)}
          className="opacity-0 group-hover:opacity-100 !p-2 text-slate-300 hover:text-red-500 transition-all"
        />
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-2 leading-tight">
        {plant.name}
      </h3>
      
      <div className="flex items-center gap-1.5 text-slate-400 mb-6">
        <Calendar size={14} />
        <span className="text-[10px] font-bold uppercase tracking-wider">
          Plantado: {plant.date || 'Reciente'}
        </span>
      </div>

      <div className="mb-8">
        <HydrationBar percentage={plant.hydration} />
      </div>

      <BaseButton 
        variant="secondary" 
        className="w-full py-4" 
        icon={Droplets}
        label="Regar Planta"
        onClick={() => onWater(plant.id)}
      />
    </div>
  );
};