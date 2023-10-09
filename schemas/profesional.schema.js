const joi = require('joi');
const id = joi.number().integer();
const ausencias = joi.boolean().truthy();
const horarios = joi.boolean().truthy();
const turnos = joi.boolean().truthy();

const createprofesionalSchema = joi.object({
  clinicaId: id.required(),
  perfilId: id.required()

});
const getprofesionalSchema = joi.object({
  clinicaId: id.required(),
  profesionalId: id.required()
});

const queryprofesionalSchema = joi.object({
  ausencias,
  horarios,
  turnos
});

module.exports = {
  createprofesionalSchema,
  getprofesionalSchema,
  queryprofesionalSchema
  };



