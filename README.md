# HuertoUP - Proyecto Integrador (Fase 1)

**HuertoUP** es una plataforma de gestión para huertos urbanos desarrollada como proyecto final de semestre. La aplicación permite a los usuarios monitorear la salud de sus plantas, gestionar el riego mediante un simulador de hidratación y acceder a una base de conocimientos técnica sobre cultivos y plagas.

---

## Descripción del Sistema

El sistema está diseñado bajo una arquitectura de componentes en **React**, utilizando **Tailwind CSS** para un diseño moderno y responsivo.

* **Gestión de Cultivos**: Permite añadir, visualizar y eliminar plantas del huerto personal.
* **Simulación en Tiempo Real**: Las plantas pierden hidratación automáticamente, requiriendo la interacción del usuario para "regarlas" y restaurar su estado.
* **Persistencia**: Utiliza `localStorage` para mantener los datos del usuario incluso después de cerrar el navegador.

---

## Instrucciones para correr el proyecto

Para ejecutar la aplicación en un entorno local, siga estos pasos:

1. **Instalar dependencias**:
```bash
npm install

```


2. **Iniciar el servidor de desarrollo**:
```bash
npm run dev

```


3. **Acceso**:
Abra su navegador en la dirección `http://localhost:5173`.

---

## Lista de Pantallas (Screens)

* **Dashboard (Panel Principal)**: Contiene el buscador global, el estado de "Huerto Vacío" y la rejilla de plantas activas con acceso rápido al riego.
* **Vista de Detalle**: Pantalla dedicada a mostrar información técnica extendida de cada planta, como requerimientos de luz, tiempos de cosecha y consejos del experto.
* **Doctor de Plagas**: Una sección especializada para identificar síntomas de plagas comunes (como la Araña Roja) y aplicar soluciones orgánicas.
* **Guía de Cultivo Pro**: Catálogo de variedades recomendadas que el usuario puede añadir a su huerto con un solo clic.

---

## Componentes Reutilizables Creados

Siguiendo los requisitos de la rúbrica, se crearon componentes "átomos" diseñados para ser usados en toda la aplicación mediante `props`:

### 1. `BaseButton` (Botón Reutilizable)

Un componente versátil que evita la duplicación de código CSS.

* **Variantes**: Soporta `primary` (verde), `danger` (rojo), `secondary` (negro), `outline` y `ghost`.
* **Tamaños**: Configurable en `sm`, `md` y `lg`.
* **Funcionalidades**: Soporte nativo para estados `disabled` y `isLoading` con un spinner animado integrado.

### 2. `FormField` (TextInput Reutilizable)

Componente unificado para todas las entradas de texto y formularios.

* **Elementos**: Incluye `label` dinámico, soporte para iconos de Lucide-React y placeholders.
* **Validación**: Prop de `error` que cambia los bordes a rojo y muestra un mensaje de advertencia bajo el campo.
* **Tipos**: Compatible con `text`, `email`, `password` y `number`.

### 3. `HydrationBar`

Barra de progreso dinámica que cambia de color (Azul a Rojo) automáticamente cuando los niveles de agua de la planta son críticos.

### 4. `StatusBadge`

Etiquetas de estado para categorizar plantas (Aromática, Frutal, etc.) con estilos predefinidos según el tipo.

---

## Tecnologías Obligatorias Cumplidas

* **React**: Arquitectura por componentes y hooks (`useState`, `useEffect`).
* **Tailwind CSS**: Estilado completo y configuración de temas personalizados.
* **Validaciones**: Formularios con control de errores básicos.
* **Estados de UI**: Manejo de estados de "Cargando", "Vacío", "Error" y "Éxito".

