const joi = require('joi');


const profesionalId = joi.number().integer();
const vigenciaDesde = joi.date();
const vigenciaHasta = joi.date();


const createausenciaSchema = joi.object({
  profesionalId: profesionalId.required(),
  vigenciaDesde: vigenciaDesde.required(),
  vigenciaHasta: vigenciaHasta.required()
});

const updateausenciaSchema = joi.object({

  vigenciaDesde,
  vigenciaHasta
});
const getausenciaSchema = joi.object({
  profesionalId: profesionalId.required(),
  ausenciaId: profesionalId.required()
});

module.exports = {
  createausenciaSchema,
  updateausenciaSchema,
  getausenciaSchema
  };


