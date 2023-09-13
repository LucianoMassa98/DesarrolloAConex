const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const VentasService = require('../services/ventas.service');
const ventasService = new VentasService();
const NegociosService = require('../services/negocios.service');
const negociosService = new NegociosService();

class ConsolidadosService {
  async create() {
    const negocios = await negociosService.find();
    negocios.forEach(async element => {
      const negocioId = element.id;
      const newConsolidado = await models.Consolidado.create(negocioId);
      if(!newConsolidado){ throw boom.notFound("No se pudo crear el capital");}
      const ventas = await ventasService.find(negocioId);
      ventas.forEach(async element => {
          await this.addItem(newConsolidado.id, element);
          newConsolidado =  await newConsolidado.update({totalVenta: newConsolidado.totalVenta+element.total});
        });
    });

  }
  async find(negocioId, query) {

  }
  async findOne(negocioId, capitalId) {

  }
  async update(negocioId, capitalId, change) {

  }
  async delete(negocioId, capitalId) {
  }


  // hacer prueba de las funciones de abajo

  async addItem(consolidadoId, venta) {
    const newConsolidado = await models.ConsolidadoProducto.create({
      consolidadoId: capitalId,
      productoId: producto.id,
      debe: producto,
      haber: cuenta.haber
    });
    if(!newConsolidado){throw boom.notFound("No se pudo agregar correctamente las cuentas al capital!");}

  }
  async subItem(data) {


  }



}
module.exports = ConsolidadosService;
