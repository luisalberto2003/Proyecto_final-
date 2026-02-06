import React, { useState } from 'react';
import { Sprout, ArrowRight } from 'lucide-react';
// Importamos tus componentes de UI siguiendo tu estructura de carpetas
import { BaseButton } from '../components/ui/BaseButton';
import { FormField } from '../components/ui/FormField';

export const Login = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // login | register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', general: '' });

  const loadUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('huertoup_users')) || [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem('huertoup_users', JSON.stringify(users));
  };

  const handleSubmit = (e) => {
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

    const users = loadUsers();

    if (mode === 'login') {
      const user = users.find(u => u.email === email.trim());
      if (!user || user.password !== password) {
        setErrors({ ...nextErrors, general: 'Usuario o clave incorrecta.' });
        return;
      }
      onLogin({ email: user.email, name: user.name || user.email.split('@')[0] });
      return;
    }

    const exists = users.some(u => u.email === email.trim());
    if (exists) {
      setErrors({ ...nextErrors, general: 'Ese correo ya está registrado.' });
      return;
    }

    const newUser = { email: email.trim(), password, name: name.trim() };
    users.push(newUser);
    saveUsers(users);
    onLogin({ email: newUser.email, name: newUser.name });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-5xl p-10 shadow-xl border border-slate-50 animate-fade">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-green-100 text-green-600 p-4 rounded-3xl mb-4">
            <Sprout size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">HuertoUp</h1>
          <p className="text-slate-500 font-medium text-center">Inicia sesión para gestionar tu huerto urbano</p>
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
            label={mode === 'login' ? 'Entrar al Huerto' : 'Crear cuenta'} 
            className="w-full py-5 text-lg"
            icon={ArrowRight}
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
