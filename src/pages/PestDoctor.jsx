// src/pages/PestDoctor.jsx
import { Bug, ShieldAlert } from 'lucide-react';
import { DOCTOR_PLAGAS } from '../data/Constants';
import { StatusBadge } from '../components/ui/StatusBadge';

export const PestDoctor = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade">
      {DOCTOR_PLAGAS.map(plaga => (
        <div key={plaga.id} className="bg-white rounded-4xl p-8 border border-slate-50 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-3xl ${plaga.danger === 'Alta' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'}`}>
              <Bug size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800">{plaga.name}</h3>
              <StatusBadge 
                label={`Peligro: ${plaga.danger}`} 
                variant={plaga.danger === 'Alta' ? 'danger' : 'warning'} 
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Síntoma</p>
              <p className="text-sm italic font-medium">"{plaga.symptom}"</p>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl border-l-4 border-green-500">
              <p className="text-[10px] font-black text-green-600 uppercase mb-1 flex items-center gap-1">
                <ShieldAlert size={12} /> Solución Orgánica
              </p>
              <p className="text-sm font-bold text-green-800">{plaga.solution}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};