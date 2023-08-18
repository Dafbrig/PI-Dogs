const { Dog, Temperament } = require('../models');

const dogsController = {
  getAllDogs: async (req, res) => {
    try {
      const dogs = await Dog.findAll({
        include: [{ model: Temperament, attributes: ['name'] }],
      });
      res.json(dogs);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching dogs' });
    }
  },

  getDogById: async (req, res) => {
    const { idRaza } = req.params;
    try {
      const dog = await Dog.findByPk(idRaza, {
        include: [{ model: Temperament, attributes: ['name'] }],
      });
      if (!dog) {
        return res.status(404).json({ message: 'Dog not found' });
      }
      res.json(dog);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching dog details' });
    }
  },

  searchDogsByName: async (req, res) => {
    const { name } = req.query;
    try {
      const dogs = await Dog.findAll({
        where: {
          name: { $iLike: `%${name}%` }, // Case-insensitive search
        },
        include: [{ model: Temperament, attributes: ['name'] }],
      });
      res.json(dogs);
    } catch (error) {
      res.status(500).json({ error: 'Error searching dogs' });
    }
  },

  createDog: async (req, res) => {
    const { name, height, weight, life_span, temperaments } = req.body;
    try {
      const newDog = await Dog.create({
        name,
        height,
        weight,
        life_span,
      });
      if (temperaments && temperaments.length > 0) {
        const selectedTemperaments = await Temperament.findAll({
          where: { name: temperaments },
        });
        await newDog.addTemperaments(selectedTemperaments);
      }
      res.status(201).json(newDog);
    } catch (error) {
      res.status(500).json({ error: 'Error creating dog' });
    }
  },

  // Define otros métodos de acuerdo a las funcionalidades requeridas.
};

module.exports = dogsController;
