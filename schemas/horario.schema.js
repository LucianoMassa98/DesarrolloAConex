const joi = require('joi');


const profesionalId = joi.number().integer();
const especialidadId = joi.number().integer();
const nroDia = joi.number().integer();
const vigenciaDesde = joi.date();
const vigenciaHasta = joi.date();
const horaDesde = joi.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/);
const horaHasta = joi.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/);
const intervalo = joi.number().integer();


const createhorarioSchema = joi.object({
  clinicaId: profesionalId.required(),
  profesionalId: profesionalId.required(),
  especialidadId: especialidadId.required(),
  nroDia: nroDia.required(),
  vigenciaDesde,
  vigenciaHasta,
  horaDesde: horaDesde.required(),
  horaHasta: horaHasta.required(),
  intervalo: intervalo.required()
});

const updatehorarioSchema = joi.object({
  especialidadId,
  nroDia,
  vigenciaDesde,
  vigenciaHasta,
  horaDesde,
  horaHasta,
  intervalo
});
const gethorarioSchema = joi.object({
  profesionalId: especialidadId.required(),
  horarioId: especialidadId.required()
});

module.exports = {
  createhorarioSchema,
  updatehorarioSchema,
  gethorarioSchema
  };


