// src/server.js

// 1. Importar la librería de Express
const express = require('express');
const app = express();
const port = 3000; // El puerto donde correrá el servidor

// 2. Configuración de Express
// Le indicamos a Express dónde están los archivos estáticos (CSS, JS cliente)
app.use(express.static('public'));

// Le indicamos dónde están las vistas (HTML)
// Usaremos EJS como motor de plantillas, aunque solo lo usaremos para servir HTML simple
app.set('views', './views');
app.set('view engine', 'ejs'); 

// 3. Definición de Rutas (Endpoints)

// Ruta principal o Home (GET /)
app.get('/', (req, res) => {
    // Cuando alguien visite la URL base, renderizamos la vista 'index'
    console.log('Petición recibida en la ruta /');
    res.render('index', { 
        titulo: 'Reservas Hoteleras',
        mensaje: 'Bienvenido al sistema de reservas sencillo.',
        nombreApp: 'Reservas 2025'
    }); 
});

// 4. Iniciar el Servidor
app.listen(port, () => {
    console.log(`\n\n✅ Servidor Express iniciado y escuchando en: http://localhost:${port}`);
    console.log('Presiona CTRL + C para detener el servidor.\n');
});