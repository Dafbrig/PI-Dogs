// Carga las variables de entorno desde .env
require('dotenv').config();

// Importa las dependencias necesarias
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Importa las rutas para los diferentes recursos
const routes = require('./routes/index.js');
const dogsRoutes = require('./routes/dogs'); // Importa las rutas para dogs
const temperamentsRoutes = require('./routes/temperaments'); // Importa las rutas para temperaments

// Importa la conexión a la base de datos y modelos
const { conn } = require('./db.js');

// Crea una instancia de Express
const server = express();

// Asigna un nombre a tu servidor
server.name = 'API';

// Configura middleware para el manejo de solicitudes y respuestas
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  // Configura encabezados CORS para permitir solicitudes desde el frontend
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Usa las rutas para los diferentes recursos
server.use('/', routes);
server.use('/dogs', dogsRoutes); // Conecta las rutas para dogs
server.use('/temperaments', temperamentsRoutes); // Conecta las rutas para temperaments

// Middleware para manejo de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Sincroniza la base de datos y arranca el servidor
conn.sync({ force: false }) // Cambia a `true` si deseas que las tablas se recreen en cada reinicio
  .then(() => {
    server.listen(3001, () => {
      console.log('Server is listening on port 3001');
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Exporta el servidor para usarlo en otros archivos
module.exports = server;
