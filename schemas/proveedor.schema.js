const joi = require('joi');
const id = joi.number().integer();

const createproveedorSchema = joi.object({
  negocioId: id.required(),
  perfilId: id.required(),

});

const getproveedorSchema = joi.object({
  negocioId: id.required(),
  proveedorId: id.required()
});

module.exports = {
  createproveedorSchema,
  getproveedorSchema
  };
