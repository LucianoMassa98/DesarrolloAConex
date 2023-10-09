const joi = require('joi');
const id = joi.number().integer();;
const perfilId = joi.number().integer();

const condicionFiscal = joi.string().min(3);
const region = joi.string().min(3);

const createclinicaSchema = joi.object({
  perfilId: perfilId.required(),
  condicionFiscal: condicionFiscal.required(),
  region: region.required()
});

const updateclinicaSchema = joi.object({
  condicionFiscal,
  region

});
const getclinicaSchema = joi.object({
  clinicaId: id.required()
});
module.exports ={
  createclinicaSchema,
  updateclinicaSchema,
  getclinicaSchema};
