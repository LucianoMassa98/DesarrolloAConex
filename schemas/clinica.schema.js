const joi = require('joi');
const id = joi.number().integer();;
const perfilId = joi.number().integer();
const username=joi.string().min(3);
const celular = joi.number();

const condicionFiscal = joi.string().min(3);
const region = joi.string().min(3);

const createclinicaSchema = joi.object({
  username: username.required(),
  perfilId: perfilId.required(),
  condicionFiscal: condicionFiscal.required(),
  region: region.required()
});

const updateclinicaSchema = joi.object({
  condicionFiscal,
  region,
  username
});
const getclinicaSchema = joi.object({
  clinicaId: id.required()
});
const getclinicaCelularSchema = joi.object({
  celular: celular.required()
});
module.exports ={
  createclinicaSchema,
  updateclinicaSchema,
  getclinicaCelularSchema,
  getclinicaSchema};
