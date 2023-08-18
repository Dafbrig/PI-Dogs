const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo
// Luego le injectamos la conexión a sequelize.
module.exports = (sequelize) => {
    // Defino el modelo de la tabla "temperament"
    sequelize.define('temperament', {
        // Campo name de tipo STRING, no puede ser nulo
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
