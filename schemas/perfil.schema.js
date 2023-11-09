const joi = require('joi');

const id = joi.number().integer();
const nombre = joi.string();
const apellido = joi.string();
const celular = joi.number();
const cedula = joi.number();
const direccion = joi.string();
const email=joi.string().email();
const imagen =  joi.string().uri();
const nacimiento = joi.date();
const createperfilSchema = joi.object({

  nombre: nombre.required(),
  apellido: apellido.required(),
  cedula: cedula.required(),
  celular:celular.required(),
  direccion,
  email: email.required(),
  imagen,
  nacimiento: nacimiento.required()

});
const updateperfilSchema = joi.object({
 nombre,
 apellido,
 cedula,
 celular,
 direccion,
 email,
 imagen,
 nacimiento
});
const getperfilSchema = joi.object({
  perfilId: id.required()
});
const queryperfilSchema = joi.object({
 cedula: cedula.required(),
 celular: celular.required(),
 email: email.required()
});

module.exports = {
  createperfilSchema,
  updateperfilSchema,
  getperfilSchema,
  queryperfilSchema
  };


