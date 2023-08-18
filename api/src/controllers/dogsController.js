const axios = require('axios');
const { API_KEY } = process.env; // Importa la API_KEY desde las variables de entorno
const { Temperament, Dog } = require('../db'); // Importa los modelos Temperament y Dog desde db.js
const dogs = require('../routes/routesDog'); // Importa las rutas para perros (¿Es necesario?)

const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`; // Construye la URL de la API

// Función para obtener información de perros desde la API
const getApiInfoDog = async () => {
    const apiURL = await axios.get(URL);
    const apiInfo = await apiURL.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            breed_group: e.breed_group,
            temperament: e.temperament,
            life_span: e.life_span,
            weight_min: parseInt(e.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(e.weight.metric.slice(4).trim()),
            height_min: parseInt(e.height.metric.slice(0, 2).trim()),
            height_max: parseInt(e.height.metric.slice(4).trim()),
        };
    });
    return apiInfo;
};

// Función para obtener información de perros desde la base de datos
const getDBInfoDog = async () => {
    var dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    return dogsDB;
};

// Función para obtener información completa de perros combinando API y base de datos
const getAllDogs = async () => {
    const apiInfo = await getApiInfoDog();
    const DBInfo = await getDBInfoDog();
    const infoTotal = apiInfo.concat(DBInfo);
    return infoTotal;
};

// Exporta las funciones para usarlas en otros módulos
module.exports = {
    getAllDogs, getApiInfoDog, getDBInfoDog
};
