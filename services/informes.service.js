const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const {Op}=require('sequelize');
const CapitalesServices = require('../services/capitales.service');
const capitalesService = new CapitalesServices();

class InformesService {
  async reporteVentas(negocioId, query) {
    const createdAt = {};
    const { fecha_min, fecha_max } = query;
    if (fecha_min && fecha_max) {
      createdAt = {
        [Op.gte]: fecha_min,
        [Op.lte]: fecha_max,
      };
    }
    const negocio = await models.Negocio.findByPk(id, {
      include: [
        {
          association: 'ventas',
          where: {
            createdAt
          },
        },
      ],
    });

    if (!negocio) {
      throw boom.notFound('Informe Not Found');
    }
    return negocio.ventas;
  }

  async evolucionCapital(negocioId, query) {

    const capitales = await capitalesService.find(negocioId);
   /* var fechaActual = new Date();
    if(capitales.length>0){
      var fechaUltima = capitales[capitales.length-1].createdAt;
      if(fechaUltima<fechaActual){
        if(fechaUltima.setDate(fecha.getDate() + 7)<=fechaActual){
          // crear nuevo capital
          const newCapital = await capitalesService.create(negocioId);
          capitales.push(newCapital);
        }

    }else{
        const newCapital = await capitalesService.create(negocioId);
        capitales.push(newCapital);
      }
    return capitales;
  }*/
    return capitales;
  }
}
module.exports = InformesService;
