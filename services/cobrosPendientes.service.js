const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CobrosPendientesService {
  async create(data) {
    const dat = await models.CobroPendiente.create(data);
    if (!dat) {
      throw boom.notFound('Cobro Not Found');
    }
    return dat;
  }
  async find(id) {
    const negocio = await models.Negocio.findByPk(id, {
      include: ['cobrosPendientes'],
    });
    if (!negocio) {
      throw boom.notFound('Negocio Not Found');
    }
    return negocio.cobros;
  }
  async findOne(negocioId, cobroPendienteId) {
    const cobro = await models.CobroPendiente.findByPk(cobroPendienteId);
    if (!cobro) {
      throw boom.notFound('cobro Not Found');
    }
    if (cobro.negocioId != negocioId) {
      throw boom.notFound('El cobro no pertenece al negocio');
    }
    return cobro;
  }
  async delete(negocioId, cobroPendienteId) {
    const cobro = await this.findOne(negocioId, cobroPendienteId);
    const rta = await cobro.destroy();
    if (!rta) {
      throw boom.notFound('cobro Not Found');
    }
    return rta;
  }
}
module.exports = CobrosPendientesService;
