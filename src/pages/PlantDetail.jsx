import React from 'react';
import { ArrowLeft, Sun, Timer, Droplets, Info } from 'lucide-react';
// IMPORTANTE: Corregimos las rutas para que pasen por /components/
import { BaseButton } from '../components/ui/BaseButton';
import { HydrationBar } from '../components/ui/HydrationBar';
import { StatusBadge } from '../components/ui/StatusBadge';

export const PlantDetail = ({ plant, onBack }) => {
  if (!plant) return null;

  return (
    <div className="max-w-3xl mx-auto animate-fade">
      <BaseButton 
        variant="ghost" 
        icon={ArrowLeft} 
        label="Volver al huerto" 
        onClick={onBack}
        className="mb-8"
      />

      <div className="bg-white rounded-5xl p-10 shadow-sm border border-slate-50">
        <div className="flex justify-between items-start mb-8">
          <div>
            {/* Verificamos que la variante sea lógica (info, success, danger) */}
            <StatusBadge label={plant.type} variant="info" />
            <h2 className="text-4xl font-black text-slate-800 mt-2">{plant.name}</h2>
          </div>
          <div className="bg-green-100 p-4 rounded-3xl text-green-600">
            <Info size={32} />
          </div>
        </div>

        <div className="mb-10">
          <HydrationBar percentage={plant.hydration} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-6 rounded-3xl">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mb-2">
              <Sun size={14} /> Necesidad de Luz
            </div>
            <p className="font-bold text-slate-700">{plant.light || 'Variable'}</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mb-2">
              <Timer size={14} /> Tiempo de Cosecha
            </div>
            <p className="font-bold text-slate-700">{plant.harvest || 'N/A'}</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-3xl border-2 border-blue-100">
          <h4 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
            <Droplets size={18} /> Consejo del experto
          </h4>
          <p className="text-blue-600 text-sm leading-relaxed italic">
            {plant.tip || "Mantén la tierra húmeda pero evita el encharcamiento."}
          </p>
        </div>
      </div>
    </div>
  );
};