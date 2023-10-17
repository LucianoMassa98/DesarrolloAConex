const joi = require('joi');


const profesionalId = joi.number().integer();
const pacienteId = joi.number().integer();
const observacion = joi.string();
const presentismo = joi.string();
const date = joi.date();

const libres= joi.boolean().truthy();
const fechaDesde=joi.date();
const fechaHasta= joi.date();

const createturnoSchema = joi.object({
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
});
const getturnoSchema = joi.object({
  profesionalId: profesionalId.required(),
  turnoId: profesionalId.required()
});

const queryTurnoSchema = joi.object({
  profesionalId,
  libres,
  fechaDesde,
  fechaHasta
});
module.exports = {
  createturnoSchema,
  updateturnoSchema,
  getturnoSchema,
  queryTurnoSchema
  };


