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
      const newConsolidado = await models.Consolidado.create({negocioId});

      if(!newConsolidado){ throw boom.notFound("No se pudo crear el capital");}
      const dateHasta = new Date();
      const dateDesde = new Date(dateHasta);
      dateDesde.setDate(dateHasta.getDate() - 7);


      const ventas = await ventasService.find(negocioId,{
        dateDesde:`${dateDesde.getFullYear()}-${(dateDesde.getMonth() + 1).toString().padStart(2, '0')}-${dateDesde.getDate().toString().padStart(2, '0')}T06:00:00`,
        dateHasta:`${dateHasta.getFullYear()}-${(dateHasta.getMonth() + 1).toString().padStart(2, '0')}-${dateHasta.getDate().toString().padStart(2, '0')}T06:00:00`
      });
      let sum =0;

      const idConsol=newConsolidado.id;
      ventas.forEach(async element => {

          const rta = await models.ConsolidadoVenta.create({
            consolidadoId: idConsol,
            ventaId: element.id,
          });
          sum =  sum + element.total;
        });

      const rta = await newConsolidado.update({montoTotal:sum});

    });

  }
  async find(negocioId, query) {
    const options={
      where:{negocioId: negocioId}
    };

    const capitales = await models.Consolidado.findAll(options);
    if(!capitales){ throw boom.notFound("No se encontraron capitales para este negocio");}
    return capitales;
  }
  async findOne(negocioId, capitalId) {

  }
  async update(negocioId, capitalId, change) {

  }
  async delete(negocioId, capitalId) {
  }


  // hacer prueba de las funciones de abajo

  async addProducto(consolidadoId, ventaId) {
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
