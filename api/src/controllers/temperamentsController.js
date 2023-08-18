const { Temperament } = require('../models');

const temperamentsController = {
  getAllTemperaments: async (req, res) => {
    try {
      const temperaments = await Temperament.findAll();
      res.json(temperaments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching temperaments' });
    }
  },

  // Define otros métodos de acuerdo a las funcionalidades requeridas.
};

module.exports = temperamentsController;
