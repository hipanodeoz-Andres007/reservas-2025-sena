import React, { useState } from 'react';
import { Search, MapPin, Users, Calendar, Sun, Moon } from 'lucide-react';

// ========================================================================
// 1. COMPONENTE DE BARRA DE NAVEGACIÓN (Navbar / Header)
// Implementa los puntos 1, 2 y 10 de tu Lista de Componentes de EV02
// ========================================================================
const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className={`shadow-lg sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Título / Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-600">
              Hotel Paraíso
            </h1>
          </div>

          {/* Menú de Navegación (Punto 2: Navbar) */}
          <div className="hidden md:flex space-x-4">
            {['Inicio', 'Información', 'Servicios', 'Reservar', 'Contacto'].map(item => (
              <a 
                key={item} 
                href="#" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${
                  item === 'Reservar' 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Selector de Tema (Punto 10: ThemeSwitcher) */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
            title="Cambiar Tema"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

// ========================================================================
// 2. COMPONENTE DE FORMULARIO DE RESERVA (Forms)
// Implementa el punto 7 de tu Lista de Componentes de EV02
// ========================================================================
const ReservaForm = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    destino: 'Cartagena, Colombia',
    fechaInicio: '',
    fechaFin: '',
    huespedes: 2,
  });

  const [confirmacion, setConfirmacion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setConfirmacion(null);
    
    // Simulación de API
    setTimeout(() => {
      setConfirmacion({
        mensaje: '¡Reserva Confirmada! Disfruta tu viaje.',
        codigo: `RSRV-${Math.floor(Math.random() * 90000) + 10000}`,
      });
      setIsLoading(false);
    }, 1500); 
  };

  return (
    <div className={`p-6 rounded-xl shadow-2xl transition duration-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>
        Encuentra tu Reserva
      </h2>

      {/* Condicional: Muestra Confirmación o Formulario */}
      {confirmacion ? (
        <ConfirmacionCard confirmacion={confirmacion} reset={() => setConfirmacion(null)} isDarkMode={isDarkMode} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Destino */}
          <InputField 
            label="Destino" 
            name="destino" 
            type="text" 
            value={formData.destino} 
            onChange={handleChange} 
            Icon={MapPin}
            isDarkMode={isDarkMode}
            placeholder="Ej: Cartagena, San Andrés"
          />

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <InputField 
              label="Entrada" 
              name="fechaInicio" 
              type="date" 
              value={formData.fechaInicio} 
              onChange={handleChange} 
              Icon={Calendar}
              isDarkMode={isDarkMode}
            />
            <InputField 
              label="Salida" 
              name="fechaFin" 
              type="date" 
              value={formData.fechaFin} 
              onChange={handleChange} 
              Icon={Calendar}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Huéspedes */}
          <InputField 
            label="Huéspedes" 
            name="huespedes" 
            type="number" 
            value={formData.huespedes} 
            onChange={handleChange} 
            Icon={Users}
            isDarkMode={isDarkMode}
            min="1"
          />

          {/* Botón de Envío (Punto 8: Buttons) */}
          <button
            type="submit"
            disabled={isLoading || !formData.destino || !formData.fechaInicio || !formData.fechaFin || formData.huespedes < 1}
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 disabled:opacity-50 mt-6"
          >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">...</svg>
            ) : (
              <>
                <Search size={20} className="mr-2" /> Buscar Disponibilidad
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

// ========================================================================
// 3. COMPONENTE AUXILIAR: InputField
// Reutilizable para mejorar el código (similar al concepto de Buttons reutilizables)
// ========================================================================
const InputField = ({ label, name, type, value, onChange, Icon, isDarkMode, ...props }) => (
  <div>
    <label htmlFor={name} className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {label}
    </label>
    <div className="relative">
      <Icon size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-indigo-400' : 'text-gray-400'}`} />
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-gray-50 border-gray-300 text-gray-800'}`}
        {...props}
      />
    </div>
  </div>
);

// ========================================================================
// 4. COMPONENTE AUXILIAR: ConfirmacionCard (Simula el concepto Card / Modal)
// Implementa el punto 5 (Card) y maneja la información de confirmación.
// ========================================================================
const ConfirmacionCard = ({ confirmacion, reset, isDarkMode }) => (
  <div className={`p-6 rounded-xl shadow-xl border-l-4 transition duration-300 ${isDarkMode ? 'bg-gray-800 border-green-500' : 'bg-green-50 border-green-500'}`}>
    <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
      ¡Éxito!
    </h3>
    <p className={`mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      {confirmacion.mensaje}
    </p>
    <div className={`p-3 rounded-lg font-mono text-sm ${isDarkMode ? 'bg-gray-700 text-green-300' : 'bg-green-100 text-green-800'}`}>
      Código de Reserva: **{confirmacion.codigo}**
    </div>
    <button
      onClick={reset}
      className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
    >
      Nueva Búsqueda
    </button>
  </div>
);

// ========================================================================
// 5. COMPONENTE DE PIE DE PÁGINA (Footer)
// Implementa el punto 9 de tu Lista de Componentes de EV02
// ========================================================================
const Footer = ({ isDarkMode }) => (
  <footer className={`mt-auto py-6 border-t ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Hotel Paraíso. Proyecto Formativo SENA.
      </p>
      <p className="text-xs mt-1">
        Desarrollado con React.js y Tailwind CSS.
      </p>
    </div>
  </footer>
);


// ========================================================================
// COMPONENTE PRINCIPAL (App)
// Estructura el Layout (Punto 4: Section Component)
// ========================================================================
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // Clase base para el modo oscuro
  const themeClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';

  return (
    <div className={`min-h-screen flex flex-col ${themeClass} transition-colors duration-500`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Contenido Principal (Section Component) */}
      <main className="flex-grow p-4 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Columna de Información del Hotel (Placeholder para el punto 6: Gallery) */}
          <div className={`p-6 rounded-xl shadow-xl transition duration-500 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}`}>
            <h2 className="text-3xl font-extrabold text-indigo-500 mb-4">
              Hotel Paraíso
            </h2>
            <p className="mb-4">
              Tu escapada de lujo en el Caribe Colombiano. Reserva hoy y recibe un 15% de descuento en tu primer servicio de spa.
            </p>
            <p className="text-sm border-l-4 border-indigo-500 pl-3 italic">
              "En la EV02 definimos este espacio como la Galería de Imágenes y Secciones de Opiniones (Cards)."
            </p>
            <div className="mt-4 bg-indigo-100 p-3 rounded-lg text-indigo-800 font-semibold">
              <span className="font-bold">Ubicación:</span> Cartagena, Colombia.
            </div>
            
            <button className="mt-6 w-full py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600">
              Ver Galería (Punto 6)
            </button>
          </div>

          {/* Columna del Formulario de Reservas (Punto 7: Forms) */}
          <ReservaForm isDarkMode={isDarkMode} />
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;