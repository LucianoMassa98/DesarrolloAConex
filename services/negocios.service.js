const { boom } = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const dataEstandar = require('../db/datosStandar/cuentas.json');

const CuentasService = require('../services/cuentas.service');
const cuentasService = new CuentasService();
class NegociosService {
  async create(data) {

    if (!dataEstandar) {
      throw boom.notFound('No se pudo traer el archivo de cuentas');
    }
    console.log(dataEstandar);
    const rta = await models.Negocio.create(data);
    if (!rta) {
      throw boom.notFound('No se pudo crear el negocio');
    }

    dataEstandar.datos.forEach(async (element) => {
      await cuentasService.create({
        negocioId: rta.id,
        ...element});
    });
    return rta;
  }
  async find() {
    const rta = await models.Negocio.findAll();
    return rta;
  }
  async findOne(id) {
    const rta = await models.Negocio.findByPk(id, {
      include: [
        'categorias',
        'productos',
        'usuarios',
        'clientes',
        'proveedores',
      ],
    });
    if (!rta) {
      throw boom.notFound('Negocio Not Found');
    }
    return rta;
  }
  async update(id, changes) {
    const newNegocio = await this.findOne(id);
    const rta = await newNegocio.update(changes);
    return rta;
  }
  async delete(id) {
    const newNegocio = await this.findOne(id);
    const cuentas = await cuentasService.find(id);

    /*cuentas.forEach(async element => {
      const res = await element.destroy();
      if(!res){ throw boom.notFound("error al eliminar las cuentas del negocio"); }
    });*/
    const rta = await newNegocio.destroy();
    return newNegocio;
  }


}
module.exports = NegociosService;
