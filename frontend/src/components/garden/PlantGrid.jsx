import { PlantCard } from './PlantCard';

export const PlantGrid = ({ plants, onWater, onDelete, onSelect, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {plants.map(plant => (
        <PlantCard 
          key={plant.id} 
          plant={plant} 
          onWater={onWater} 
          onDelete={onDelete} 
          onSelect={onSelect}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
