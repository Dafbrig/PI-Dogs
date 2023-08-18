const { Router } = require('express');
const dogsController = require('../controllers/dogsController'); // Importa el controlador de perros
const temperamentsController = require('../controllers/temperamentsController'); // Importa el controlador de temperamentos

const router = Router();

// Definir rutas para perros
router.get('/dogs', dogsController.getAllDogs);
router.get('/dogs/:idRaza', dogsController.getDogById);
router.get('/dogs/name', dogsController.searchDogsByName);
router.post('/dogs', dogsController.createDog);

// Definir rutas para temperamentos
router.get('/temperaments', temperamentsController.getAllTemperaments);

module.exports = router;