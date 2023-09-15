const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class pagosPendientesService {
  async create(data) {
    const dat = await models.PagoPendiente.create(data);
    if (!dat) {
      throw boom.notFound('Pago pendiente Not Found');
    }
    return dat;
  }
  async find(id) {
    const negocio = await models.Negocio.findByPk(id, {
      include: ['pagosPendientes'],
    });
    if (!negocio) {
      throw boom.notFound('Negocio Not Found');
    }
    return negocio.cobros;
  }
  async findOne(negocioId, pagoPendienteId) {
    const pago = await models.PagoPendiente.findByPk(pagoPendienteId);
    if (!pago) {
      throw boom.notFound('pago Not Found');
    }
    if (pago.negocioId != negocioId) {
      throw boom.notFound('El pago no pertenece al negocio');
    }
    return pago;
  }
  async delete(negocioId, pagoPendienteId) {
    const cobro = await this.findOne(negocioId, pagoPendienteId);
    const rta = await cobro.destroy();
    if (!rta) {
      throw boom.notFound('cobro Not Found');
    }
    return cobro;
  }
}
module.exports = pagosPendientesService;
