const joi = require('joi');

const id = joi.number().integer();
const nombre = joi.string();
const apellido = joi.string();
const celular = joi.string();
const direccion = joi.string();
const email=joi.string().email();
const imagen =  joi.string().uri();

const createperfilSchema = joi.object({

  nombre: nombre.required(),
  apellido: apellido.required(),
  celular,
  direccion,
  email: email.required(),
  imagen

});
const updateperfilSchema = joi.object({
 nombre,
 apellido,
 celular,
 direccion,
 email,
 imagen
});
const getperfilSchema = joi.object({
  perfilId: id.required()
});

module.exports = {
  createperfilSchema,
  updateperfilSchema,
  getperfilSchema
  };


