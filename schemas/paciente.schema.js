const joi = require('joi');
const id = joi.number().integer();
const condIva = joi.string();
const createpacienteSchema = joi.object({
  clinicaId: id.required(),
  perfilId: id.required(),
  CondIVA: condIva.required()

});
const getpacienteSchema = joi.object({
  clinicaId: id.required(),
  pacienteId: id.required()
});

module.exports = {
  createpacienteSchema,
  getpacienteSchema
  };
