// src/components/garden/PlantCard.jsx
import { Trash2, Droplets, Calendar, Pencil } from 'lucide-react';
import { BaseButton } from '../ui/BaseButton';
import { HydrationBar } from '../ui/HydrationBar';
import { StatusBadge } from '../ui/StatusBadge';

export const PlantCard = ({ plant, onWater, onDelete, onSelect, onEdit }) => {
  // Determinamos el color del badge según la hidratación
  const getStatusVariant = () => {
    if (plant.hydration < 20) return 'danger';
    if (plant.hydration < 50) return 'warning';
    return 'success';
  };

  return (
    <div 
      onClick={() => onSelect(plant)} // Acción para abrir el detalle
      className="cursor-pointer bg-white rounded-4xl p-7 border border-slate-50 shadow-sm hover:shadow-xl transition-all animate-fade group"
    >
      <div className="flex justify-between items-start mb-6">
        <StatusBadge 
          label={plant.type} 
          variant={getStatusVariant()} 
        />
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
          <BaseButton 
            variant="ghost" 
            size="sm" 
            icon={Pencil} 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(plant);
            }}
            className="!p-2 text-slate-300 hover:text-slate-600"
          />
          <BaseButton 
            variant="ghost" 
            size="sm" 
            icon={Trash2} 
            onClick={(e) => {
              e.stopPropagation(); // Evita que se dispare el onSelect del contenedor
              onDelete(plant.id);
            }}
            className="!p-2 text-slate-300 hover:text-red-500"
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-blue-800 mb-2 leading-tight">
        {plant.displayName}
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
        onClick={(e) => {
          e.stopPropagation(); // Evita abrir el detalle al regar
          onWater(plant.id);
        }}
      />
    </div>
  );
};
