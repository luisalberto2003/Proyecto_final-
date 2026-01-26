import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Asegúrate de que el nombre del archivo CSS coincida exactamente
import './index.css' 

// IMPORTANTE: El nombre debe ser 'App' con la 'A' mayúscula 
// porque renombraste el archivo a App.jsx
import App from './App' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)