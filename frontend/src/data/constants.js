/*Plantas de ejemplo para el cultivo*/
export const GUIA_CULTIVO = [
  { 
    id: 101, 
    name: 'Tomate', 
    type: 'Hortaliza', 
    light: 'Sol directo', 
    water: 'Frecuente', 
    harvest: '90 días', 
    tip: 'Usa tutores para que la planta no se caiga.' 
  },
  { 
    id: 102, 
    name: 'Albahaca', 
    type: 'Aromática', 
    light: 'Semisombra', 
    water: 'Regular', 
    harvest: '45 días', 
    tip: 'Corta las flores para que la planta viva más tiempo.' 
  },
  { 
    id: 103, 
    name: 'Menta', 
    type: 'Aromática', 
    light: 'Sombra parcial', 
    water: 'Alta', 
    harvest: 'Todo el año', 
    tip: 'Es muy invasiva: mejor mantenla en una maceta propia.' 
  }
];

/**
 * Diccionario de plagas y soluciones orgánicas para la sección "Doctor".
 */
export const DOCTOR_PLAGAS = [
  { 
    id: 1, 
    name: 'Pulgón', 
    symptom: 'Hojas pegajosas y hormigas cerca.', 
    solution: 'Agua con jabón potásico.', 
    danger: 'Media' 
  },
  { 
    id: 2, 
    name: 'Araña Roja', 
    symptom: 'Telarañas muy finas bajo las hojas.', 
    solution: 'Aceite de Neem y humedad.', 
    danger: 'Alta' 
  },
  { 
    id: 3, 
    name: 'Cochinilla', 
    symptom: 'Manchas blancas con textura de algodón.', 
    solution: 'Alcohol diluido o jabón.', 
    danger: 'Alta' 
  },
  { 
    id: 4, 
    name: 'Mosca Blanca', 
    symptom: 'Pequeños insectos blancos al sacudir la planta.', 
    solution: 'Trampas amarillas y jabón potásico.', 
    danger: 'Media' 
  }
];
