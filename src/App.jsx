import React, { useState, useEffect } from 'react';
import { X, Sprout, Loader2 } from 'lucide-react';

// Importación de Layout y UI
import { PageHeader } from './components/layout/PageHeader';
import { MainNavigation } from './components/layout/MainNavigation';
import { BaseButton } from './components/ui/BaseButton';
import { FormField } from './components/ui/FormField';

// Importación de Páginas y Datos
import { Dashboard } from './pages/Dashboard';
import { PestDoctor } from './pages/PestDoctor';
import { PlantDetail } from './pages/PlantDetail';
import { Login } from './pages/Login';
import { GUIA_CULTIVO } from './data/constants'; 

export default function App() {
  // --- ESTADOS DE AUTENTICACIÓN ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // --- ESTADOS GLOBALES DEL HUERTO ---
  const [plants, setPlants] = useState([]);
  const [activeTab, setActiveTab] = useState('huerto');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({ name: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Estado para el formulario de nueva planta (Campos lógicos verificados)
  const [newPlant, setNewPlant] = useState({ 
    name: '', 
    type: 'Aromática' 
  });

  // --- EFECTOS ---

  // 1. Persistencia de Datos
  useEffect(() => {
    const savedPlants = localStorage.getItem('huertoup_data_jose');

    if (savedPlants) {
      setPlants(JSON.parse(savedPlants));
    }
    
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // 2. Guardar plantas automáticamente
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('huertoup_data_jose', JSON.stringify(plants));
    }
  }, [plants, isAuthenticated]);

  // 3. Simulador de Hidratación
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const timer = setInterval(() => {
      setPlants(prev => prev.map(p => ({ 
        ...p, 
        hydration: Math.max(0, p.hydration - 1) 
      })));
    }, 60000);
    return () => clearInterval(timer);
  }, [isAuthenticated]);

  // --- MANEJADORES ---

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('huertoup_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('huertoup_session');
  };

  const handleSavePlant = (e) => {
    e.preventDefault();
    const errors = { name: '', type: '' };
    if (!newPlant.name.trim()) {
      errors.name = 'Escribe un nombre para la planta.';
    }
    if (!newPlant.type) {
      errors.type = 'Selecciona un tipo de planta.';
    }
    if (errors.name || errors.type) {
      setFormErrors(errors);
      return;
    }

    if (isEditing && editingId) {
      setPlants(plants.map(p => 
        p.id === editingId 
          ? { 
              ...p, 
              name: newPlant.name.trim(), 
              type: newPlant.type,
              ...GUIA_CULTIVO.find(g => g.name === newPlant.name)
            } 
          : p
      ));
    } else {
      const plantToAdd = {
        id: Date.now(),
        name: newPlant.name.trim(),
        type: newPlant.type,
        hydration: 100, // Campo lógico de estado inicial
        date: new Date().toLocaleDateString(), // Campo lógico de registro
        ...GUIA_CULTIVO.find(g => g.name === newPlant.name)
      };

      setPlants([plantToAdd, ...plants]);
    }

    setShowModal(false);
    setNewPlant({ name: '', type: 'Aromática' });
    setFormErrors({ name: '', type: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleWater = (id) => {
    setPlants(plants.map(p => p.id === id ? { ...p, hydration: 100 } : p));
  };

  const handleDelete = (id) => {
    if(window.confirm("¿Seguro que quieres eliminar esta planta?")) {
      setPlants(plants.filter(p => p.id !== id));
      if (selectedPlant?.id === id) setSelectedPlant(null);
    }
  };

  const handleEditPlant = (plant) => {
    setIsEditing(true);
    setEditingId(plant.id);
    setNewPlant({ name: plant.name || '', type: plant.type || 'Aromática' });
    setFormErrors({ name: '', type: '' });
    setShowModal(true);
  };

  // --- RENDERIZADO ---

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-pulse">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="font-bold uppercase text-[10px] tracking-widest">Cargando tu huerto...</p>
        </div>
      );
    }

    if (selectedPlant) {
      return <PlantDetail plant={selectedPlant} onBack={() => setSelectedPlant(null)} />;
    }

    switch (activeTab) {
      case 'huerto':
        return (
          <Dashboard 
            plants={plants} 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onWater={handleWater}
            onDelete={handleDelete}
            onAddClick={() => setShowModal(true)}
            onSelectPlant={setSelectedPlant}
            onEditPlant={handleEditPlant}
          />
        );
      case 'plagas':
        return <PestDoctor />;
      case 'guia':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade">
            {GUIA_CULTIVO.map(item => (
              <div key={item.id} className="bg-white rounded-4xl p-8 border border-slate-50 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{item.name}</h3>
                  <p className="text-slate-500 text-sm mb-6">{item.tip}</p>
                </div>
                <BaseButton 
                  label="Añadir esta variedad" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    setEditingId(null);
                    setNewPlant({ name: item.name, type: item.type });
                    setFormErrors({ name: '', type: '' });
                    setShowModal(true);
                  }}
                />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
      <PageHeader 
        onAddClick={() => {
          setIsEditing(false);
          setEditingId(null);
          setFormErrors({ name: '', type: '' });
          setShowModal(true);
        }} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      <main className="max-w-5xl mx-auto px-6">
        {!selectedPlant && (
          <MainNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        {renderContent()}
      </main>

      {/* MODAL DE CREACIÓN - Verificación de campos lógicos */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-5xl p-10 shadow-2xl animate-fade relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-100 text-green-600 p-2 rounded-xl">
                <Sprout size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">
                {isEditing ? 'Editar Planta' : 'Nueva Planta'}
              </h2>
            </div>

            <form onSubmit={handleSavePlant} className="space-y-6">
              {/* CAMPO LÓGICO: NOMBRE */}
              <FormField 
                label="Nombre de la planta"
                placeholder="Ej: Tomate Cherry"
                value={newPlant.name}
                onChange={(e) => setNewPlant({...newPlant, name: e.target.value})}
                error={formErrors.name}
                required
              />
              
              {/* CAMPO LÓGICO: CATEGORÍA/TIPO */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Categoría</label>
                <select 
                  className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-green-500 outline-none transition-all"
                  value={newPlant.type}
                  onChange={(e) => setNewPlant({...newPlant, type: e.target.value})}
                >
                  <option value="Aromática">Aromática</option>
                  <option value="Hortaliza">Hortaliza</option>
                  <option value="Frutal">Frutal</option>
                  <option value="Decorativa">Decorativa</option>
                </select>
                {formErrors.type && (
                  <span className="text-red-500 text-xs font-bold ml-1 animate-fade">
                    {formErrors.type}
                  </span>
                )}
              </div>

              <BaseButton 
                type="submit"
                label={isEditing ? 'Guardar cambios' : 'Registrar en mi huerto'} 
                className="w-full py-5 text-lg"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
