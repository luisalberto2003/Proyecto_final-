import React, { useState } from 'react';
import { Sprout, ArrowRight } from 'lucide-react';
import { BaseButton } from '../components/ui/BaseButton';
import { FormField } from '../components/ui/FormField';

export const Login = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // login | register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:3000/api/auth';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = { name: '', email: '', password: '', general: '' };

    if (mode === 'register' && !name.trim()) {
      nextErrors.name = 'Escribe tu nombre.';
    }
    if (!email.trim()) {
      nextErrors.email = 'Escribe un correo válido.';
    }
    if (!password || password.length < 6) {
      nextErrors.password = 'La clave debe tener al menos 6 caracteres.';
    }

    if (nextErrors.name || nextErrors.email || nextErrors.password) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({ name: '', email: '', password: '', general: '' });

      const url = mode === 'login' ? `${API_URL}/login` : `${API_URL}/register`;

      const body =
        mode === 'login'
          ? { email: email.trim(), password }
          : { name: name.trim(), email: email.trim(), password };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors((prev) => ({ ...prev, general: data.error || 'Error en el servidor' }));
        return;
      }

      // data debería traer el usuario
      onLogin(data);
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: 'No se pudo conectar con el servidor' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-5xl p-10 shadow-xl border border-slate-50 animate-fade">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-green-100 text-green-600 p-4 rounded-3xl mb-4">
            <Sprout size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">HuertoUp</h1>
          <p className="text-slate-500 font-medium text-center">
            {mode === 'login' ? 'Inicia sesión para gestionar tu huerto urbano' : 'Crea tu cuenta'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <FormField
              label="Nombre"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
            />
          )}

          <FormField
            label="Correo Electrónico"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />

          <FormField
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />

          {errors.general && (
            <p className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-1">
              {errors.general}
            </p>
          )}

          <BaseButton
            type="submit"
            label={loading ? 'Cargando...' : mode === 'login' ? 'Entrar al Huerto' : 'Crear cuenta'}
            className="w-full py-5 text-lg"
            icon={ArrowRight}
            disabled={loading}
          />

          <button
            type="button"
            className="w-full text-slate-500 text-xs font-bold uppercase tracking-wider"
            onClick={() => {
              setErrors({ name: '', email: '', password: '', general: '' });
              setMode(mode === 'login' ? 'register' : 'login');
            }}
          >
            {mode === 'login' ? 'No tengo cuenta' : 'Ya tengo cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
};
