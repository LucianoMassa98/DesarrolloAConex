const joi = require('joi');
const id = joi.number().integer();

const createpacienteSchema = joi.object({
  clinicaId: id.required(),
  perfilId: id.required()

});
const getpacienteSchema = joi.object({
  clinicaId: id.required(),
  pacienteId: id.required()
});

module.exports = {
  createpacienteSchema,
  getpacienteSchema
  };
