const joi = require('joi');

const fecha_min = joi.date();
const fecha_max = joi.date();

const queryInformeSchema = joi.object({

});

module.exports = { queryInformeSchema };
