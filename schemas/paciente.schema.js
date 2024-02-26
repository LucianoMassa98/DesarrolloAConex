const joi = require('joi');
const id = joi.number().integer();
const pacienteId = joi.number().integer();
const CondIVA = joi.string();
const celular = joi.number().positive();

const createpacienteSchema = joi.object({
  clinicaId: id.required(),
  perfilId: id.required(),
  CondIVA

});
const getpacienteSchema = joi.object({
  clinicaId: id.required(),
  pacienteId,
  celular
});

module.exports = {
  createpacienteSchema,
  getpacienteSchema
  };
