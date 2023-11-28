const joi = require('joi');
const id = joi.number().integer();
const ausencias = joi.boolean().truthy();
const horarios = joi.boolean().truthy();
const turnos = joi.boolean().truthy();
const matricula = joi.string();
const createprofesionalSchema = joi.object({
  clinicaId: id.required(),
  perfilId: id.required(),
  matricula: matricula.required()

});
const getprofesionalSchema = joi.object({
  clinicaId: id.required(),
  profesionalId: id.required()
});

const queryprofesionalSchema = joi.object({
  ausencias,
  horarios,
  turnos,
  matricula
});

module.exports = {
  createprofesionalSchema,
  getprofesionalSchema,
  queryprofesionalSchema
  };



