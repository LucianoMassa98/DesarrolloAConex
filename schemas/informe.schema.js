const joi = require('joi');

const dateDesde = joi.date();
const dateHasta = joi.date();

const queryInformeSchema = joi.object({
  dateDesde: dateDesde.required(),
  dateHasta: dateHasta.required()
});


const getDetalleCapitalSchema = joi.object({
  negocioId: dateDesde.required(),
  capitalId: dateHasta.required()
});
module.exports = { queryInformeSchema,getDetalleCapitalSchema };
