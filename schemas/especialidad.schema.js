const joi = require('joi');


const clinicaId = joi.number().integer();
const especialidadId = joi.number().integer();
const nombre = joi.string();

const createespecialidadSchema = joi.object({
  clinicaId: clinicaId.required(),
  nombre: nombre.required()
});

const updateespecialidadSchema = joi.object({
  nombre
});
const getespecialidadSchema = joi.object({
  clinicaId: especialidadId.required(),
  especialidadId: especialidadId.required()
});

module.exports = {
  createespecialidadSchema,
  updateespecialidadSchema,
  getespecialidadSchema
  };


