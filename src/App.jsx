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

const API_URL = "http://localhost:3000";

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
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newPlant, setNewPlant] = useState({
    name: '',
    type: 'Aromática'
  });

  // SISTEMA DE HIDRATACIÓN - Decrementar cada minuto
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      setPlants(prevPlants => 
        prevPlants.map(plant => ({
          ...plant,
          hydration: Math.max(0, (plant.hydration || 0) - 1)
        }))
      );
    }, 60000); // 60000ms = 1 minuto

    return () => clearInterval(interval);
  }, [isAuthenticated]); 

  // --- CARGAR PLANTAS DEL BACKEND ---
  const loadPlants = async (userId) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/user-plants/${userId}`);
      const data = await res.json();
      
      console.log("📦 Datos del backend:", data);
      
      // PROTECCIÓN: Verificar que sea un array
      if (!Array.isArray(data)) {
        console.error("El backend no devolvió un array:", data);
        alert(`Error del servidor: ${data.error || data.message || 'Respuesta inválida'}`);
        setPlants([]);
        return;
      }
      
      const transformedPlants = data.map(plant => ({
        id: plant.id,
        name: plant.displayName || plant.nickname || plant.common_name,
        displayName: plant.displayName || plant.nickname || plant.common_name,
        type: 'Hortaliza',
        date: plant.planted_date
          ? new Date(plant.planted_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            })
          : 'Reciente',
        hydration: plant.current_moisture || 98,
        plant_id: plant.plant_id,
        scientific_name: plant.scientific_name
      }));
      
      console.log("Plantas transformadas:", transformedPlants);
      setPlants(transformedPlants);
    } catch (err) {
      console.error("Error cargando plantas:", err);
      alert("Error al cargar plantas desde el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  // --- MANEJADORES DE AUTH ---
  const handleLogin = async (userData) => {
    if (!userData || !userData.id) {
      alert("No se pudo iniciar sesión. Revisa tu email y contraseña.");
      return;
    }

    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('huertoup_session', JSON.stringify(userData));

    await loadPlants(userData.id);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPlants([]);
    localStorage.removeItem('huertoup_session');
  };

  // --- MANEJAR GUARDADO DE PLANTA ---
  const handleSavePlant = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("No hay usuario logueado. Vuelve a iniciar sesión.");
      return;
    }

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
          ? { ...p, name: newPlant.name.trim(), displayName: newPlant.name.trim(), type: newPlant.type }
          : p
      ));
    } else {
      try {
        setIsLoading(true);

        const res = await fetch(`${API_URL}/api/user-plants`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            common_name: newPlant.name.trim(),
            nickname: newPlant.name.trim()
          })
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        // IMPORTANTE: Recargar plantas SIN perder el estado de hidratación actual
        const currentPlants = [...plants]; // Guardar estado actual
        await loadPlants(user.id);
        
        // Restaurar hidratación de plantas existentes
        setPlants(prevPlants => 
          prevPlants.map(plant => {
            const existingPlant = currentPlants.find(p => p.id === plant.id);
            if (existingPlant) {
              return { ...plant, hydration: existingPlant.hydration };
            }
            return plant;
          })
        );

      } catch (err) {
        console.error("ERROR GUARDANDO PLANTA:", err);
        alert("No se pudo guardar la planta en la base de datos");
      } finally {
        setIsLoading(false);
      }
    }

    setShowModal(false);
    setNewPlant({ name: '', type: 'Aromática' });
    setFormErrors({ name: '', type: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  // REGAR PLANTA - Actualizar backend y frontend
  const handleWater = async (id) => {
    try {
      // Actualizar en el backend
      const res = await fetch(`${API_URL}/api/user-plants/${id}/water`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moisture: 100 })
      });

      if (!res.ok) throw new Error('Error al regar');

      // Actualizar en el frontend
      setPlants(plants.map(p => p.id === id ? { ...p, hydration: 100 } : p));
      
      console.log("Planta regada exitosamente");
    } catch (err) {
      console.error("Error regando planta:", err);
      alert("No se pudo regar la planta");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta planta?")) {
      try {
        await fetch(`${API_URL}/api/user-plants/${id}`, {
          method: 'DELETE',
        });
        setPlants(plants.filter(p => p.id !== id));
        if (selectedPlant?.id === id) setSelectedPlant(null);
      } catch (err) {
        console.error("Error eliminando planta:", err);
        alert("No se pudo eliminar la planta");
      }
    }
  };

  const handleEditPlant = (plant) => {
    setIsEditing(true);
    setEditingId(plant.id);
    setNewPlant({ name: plant.name || '', type: plant.type || 'Aromática' });
    setFormErrors({ name: '', type: '' });
    setShowModal(true);
  };

  // --- RENDER ---
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

      {/* MODAL */}
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
              <FormField
                label="Nombre de la planta"
                placeholder="Ej: Tomate Cherry"
                value={newPlant.name}
                onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                error={formErrors.name}
                required
              />

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Categoría</label>
                <select
                  className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-green-500 outline-none transition-all"
                  value={newPlant.type}
                  onChange={(e) => setNewPlant({ ...newPlant, type: e.target.value })}
                >
                  <option value="Aromática">Aromática</option>
                  <option value="Hortaliza">Hortaliza</option>
                  <option value="Frutal">Frutal</option>
                  <option value="Decorativa">Decorativa</option>
                </select>
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