const joi = require('joi');


const profesionalId = joi.number().integer();
const pacienteId = joi.number().integer();
const observacion = joi.string();
const presentismo = joi.string();
const date = joi.date();
const especialidadId = joi.number().integer();
const libres= joi.boolean().truthy();
const habilitado= joi.boolean();
const fechaDesde=joi.date();
const fechaHasta= joi.date();

const createturnoSchema = joi.object({
  clinicaId: profesionalId.required(),
  profesionalId: profesionalId.required(),
  pacienteId: pacienteId.required(),
  observacion: observacion.required(),
  presentismo: presentismo.required(),
  date: date.required()
});

const updateturnoSchema = joi.object({
  pacienteId,
  observacion,
  presentismo,
  habilitado
});
const getturnoSchema = joi.object({
  profesionalId: profesionalId.required(),
  turnoId: profesionalId.required()
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
  queryTurnoSchema
  };


