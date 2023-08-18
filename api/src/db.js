require('dotenv').config(); // Carga las variables de entorno desde .env
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// Crea la instancia de Sequelize con la URL de conexión
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // Establece en "false" para no mostrar las consultas SQL en la consola
  native: false, // Desactiva pg-native para mayor velocidad
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Lee todos los archivos en la carpeta Models y los requiere, luego los agrega al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injecta la conexión (sequelize) en todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitaliza los nombres de los modelos (por ejemplo, dog => Dog)
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Aquí podrían agregarse relaciones entre los modelos, como Product.hasMany(Reviews)

// Exporta los modelos y la conexión para poder importarlos en otros archivos
module.exports = {
  ...sequelize.models, // Para importar los modelos así: const { Dog, Temperament } = require('./db.js');
  conn: sequelize,     // Para importar la conexión así: const { conn } = require('./db.js');
};