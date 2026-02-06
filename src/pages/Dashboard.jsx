// src/pages/Dashboard.jsx
import { Search } from 'lucide-react';
import { FormField } from '../components/ui/FormField';
import { PlantGrid } from '../components/garden/PlantGrid';
import { EmptyGarden } from '../components/garden/EmptyGarden';

export const Dashboard = ({ plants, searchTerm, setSearchTerm, onWater, onDelete, onAddClick, onSelectPlant, onEditPlant }) => {
  // Filtramos las plantas según el buscador
  const filteredPlants = plants.filter(p => 
  (p.name || p.common_name || '').toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="animate-fade">
      {/* BUSCADOR */}
      <div className="mb-10">
        <FormField 
          icon={Search}
          placeholder="Buscar en mi huerto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* LISTADO O ESTADO VACÍO */}
      {plants.length === 0 ? (
        <EmptyGarden onAddClick={onAddClick} />
      ) : (
        <PlantGrid 
          plants={filteredPlants} 
          onWater={onWater} 
          onDelete={onDelete} 
          onSelect={onSelectPlant} // Para ir al detalle
          onEdit={onEditPlant}
        />
      )}
    </div>
  );
};
