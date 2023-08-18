const express = require('express');
const dogs = express.Router();
const { Temperament, Dog } = require('../db');
const { getAllDogs } = require('../controllers/dogControllers');
const { default: axios } = require('axios');

dogs.use(express.json());

// Ruta para obtener todos los perros, con opción de búsqueda por nombre
dogs.get('/dogs', async (req, res) => {
    const name = req.query.name;
    try {
        let dogsTotal = await getAllDogs();
        if (name) { // Si se proporciona un query de nombre
            let dogName = await dogsTotal.filter(
                dog => dog.name.toLowerCase().includes(name.toLowerCase())
            );
            dogName.length ?
                res.status(200).send(dogName) :
                res.status(404).send("Can't find the dog with the name you are looking for");
        } else { // Si no hay query en la URL
            res.status(200).json(dogsTotal);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Ruta para crear un nuevo perro
dogs.post('/dogs', async (req, res) => {
    var {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        temperament,
        image,
    } = req.body;

    if (!image) {
        try {
            image = await (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message;
        } catch (error) {
            console.log(error);
        }
    }

    if (name && height_min && height_max && weight_min && weight_max && temperament && image) {
        try {
            const createDog = await Dog.create({
                name: name,
                height_min: parseInt(height_min),
                height_max: parseInt(height_max),
                weight_min: parseInt(weight_min),
                weight_max: parseInt(weight_max),
                life_span: life_span,
                image: image || 'https://dog.ceo/api/breeds/image/random',
            });
            temperament.map(async el => {
                const findTemp = await Temperament.findAll({
                    where: { name: el }
                });
                createDog.addTemperament(findTemp);
            });
            res.status(200).send(createDog);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(400).send('Data needed to proceed is missing');
    }
});

// Ruta para obtener el detalle de un perro específico por su ID
dogs.get('/dogs/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params;
        const allDogs = await getAllDogs();
        if (!idRaza) {
            res.status(404).json("Couldn't find the name on DBase");
        } else {
            const dog = allDogs.find(dogui => dogui.id.toString() === idRaza);
            dog ? res.status(200).json(dog) : res.status(404).json("Dog not found");
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = dogs;
