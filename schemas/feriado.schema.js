const joi = require('joi');




const clinicaId= joi.number().integer();
const descripcion= joi.string();
const fecha=joi.string()
.regex(/^\d{2}\/\d{2}$/)
.messages({
  'string.pattern.base': 'El formato de la fecha debe ser "dd/mm"',
  'any.required': 'La fecha es requerida',
});

const createferiadoSchema = joi.object({
  clinicaId: clinicaId.required(),
  descripcion: descripcion.required(),
  fecha: fecha.required(),
});

const updateferiadoSchema = joi.object({
  descripcion,
  fecha
});
const getferiadoSchema = joi.object({
  clinicaId: clinicaId.required(),
  feriadoId: clinicaId.required()
});


module.exports = {
  createferiadoSchema,
  updateferiadoSchema,
  getferiadoSchema
  };


