const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo
// Luego le injectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo de la tabla "dog"
  sequelize.define('dog', {
    // Campo ID (clave primaria) de tipo UUID
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    // Campo name de tipo STRING, no puede ser nulo
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Campo height_min de tipo INTEGER, no puede ser nulo
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Campo weight_min de tipo INTEGER, no puede ser nulo
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Campo height_max de tipo INTEGER, no puede ser nulo
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Campo weight_max de tipo INTEGER, no puede ser nulo
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Campo life_span de tipo STRING, puede ser nulo
    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Campo image de tipo STRING, puede ser nulo
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Campo createdInDB de tipo BOOLEAN, no puede ser nulo, valor predeterminado true
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
