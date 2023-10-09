const joi = require('joi');


const profesionalId = joi.number().integer();
const pacienteId = joi.number().integer();
const observacion = joi.string();
const presentismo = joi.string();
const date = joi.date();


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

module.exports = {
  createturnoSchema,
  updateturnoSchema,
  getturnoSchema
  };


