const joi = require('joi');


const profesionalId = joi.number().integer();
const pacienteId = joi.number().integer();
const observacion = joi.string();
const obraSocial = joi.string();
const presentismo = joi.string();
const date = joi.date();
const especialidadId = joi.number().integer();
const libres= joi.boolean().truthy();
const celular = joi.number();

const habilitado= joi.boolean();
const fechaDesde=joi.date();
const fechaHasta= joi.date();

const createturnoSchema = joi.object({
  clinicaId: profesionalId.required(),
  profesionalId: profesionalId.required(),
  pacienteId: pacienteId.required(),
  observacion,
  obraSocial,
  presentismo,
  date: date.required()
});

const updateturnoSchema = joi.object({
  pacienteId,
  observacion,
  presentismo,
  obraSocial,
  habilitado,
  celular
});
const getturnoSchema = joi.object({
  profesionalId: profesionalId.required(),
  turnoId: profesionalId.required()
});
const getSemanaSchema = joi.object({
  profesionalId,
  especialidadId,
  libres,
  fechaDesde: fechaDesde.required()
});
const queryTurnoSchema = joi.object({
  profesionalId,
  especialidadId,
  libres,
  fechaDesde,
  fechaHasta: joi.when('fechaDesde', {
    is: joi.exist(),
    then: joi.date().min(joi.ref('fechaDesde')).required(),
  })
});
module.exports = {
  createturnoSchema,
  updateturnoSchema,
  getturnoSchema,
  queryTurnoSchema,
  getSemanaSchema
  };


