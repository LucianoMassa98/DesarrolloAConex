const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const {Op}=require('sequelize');
const CapitalesServices = require('../services/capitales.service');
const capitalesService = new CapitalesServices();
const ConsolidadosService = require('../services/consolidados.service');
const consolidadosService = new ConsolidadosService();

class InformesService {
  async reporteVentas(negocioId, query) {
    const consolidado = await consolidadosService.find(negocioId);
    return consolidado;
  }

  async evolucionCapital(negocioId, query) {

    const capitales = await capitalesService.find(negocioId);
    return capitales;
  }
}
module.exports = InformesService;
