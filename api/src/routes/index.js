const { Router } = require('express');
require('dotenv').config();

// Importar todos los routers;
const dogs = require('./routesDog'); // Importa el router para las rutas de dogs
const temperaments = require('./routesTemperaments'); // Importa el router para las rutas de temperamentos
const breeds = require('./routesBreeds'); // Importa el router para las rutas de razas

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogs); // Usa el router para las rutas de dogs en la ruta base '/'
router.use('/', temperaments); // Usa el router para las rutas de temperamentos en la ruta base '/'
router.use('/', breeds); // Usa el router para las rutas de razas en la ruta base '/'

module.exports = router;
