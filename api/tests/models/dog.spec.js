const { Dog, Temperament, conn } = require("../../src/db")
const { expect } = require('chai');

describe('Model Testing', function() {
  // Describe el modelo Dog
  describe('Dog model', function () {
    beforeEach(async function() {
      await Dog.sync({ force: true }); // Sincroniza el modelo Dog en la base de datos antes de cada prueba
    });
    
    // Describe las validaciones para el modelo Dog
    describe('Validations', function () {
      it('Should not be created without all required fields completed', function(done) {
        Dog.create({
          name: 'Rofo',
        })
        .then(() => done('Should not have been created, dude!'))
        .catch(() => done()); // Debe generar un error y ejecutar `done()` si la creación falla
      });
      
      it('Should not be created without all required fields completed', function(done) {
        Dog.create({
          height: 'ARG',
        })
        .then(() => done('Should not have been created, dude!'))
        .catch(() => done());
      });
    });
  })
  
  // Describe el modelo Temperament
  describe('Temperament model', function () {
    beforeEach(async function() {
      await Temperament.sync({ force: true }); // Sincroniza el modelo Temperament en la base de datos antes de cada prueba
    });
    
    // Describe las validaciones para el modelo Temperament
    describe('Validations', function () {
      it('Should not be created without all required fields completed', function(done) {
        Temperament.create({
          id: '11',
        })
        .then(() => done('Should not have been created, dude!'))
        .catch(() => done());
      });
      
      it('Name should be a string', function(){
        expect(typeof Temperament.name).equal("string"); // Verifica que el tipo de dato del campo name sea string
      });
    });
  });
});
