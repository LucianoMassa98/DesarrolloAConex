const joi = require('joi');
const id = joi.number().integer();

const createclienteSchema = joi.object({
  negocioId: id.required(),
  perfilId: id.required()

});

const getclienteSchema = joi.object({
  negocioId: id.required(),
  clienteId: id.required()
});

module.exports = {
  createclienteSchema,
  getclienteSchema
  };
