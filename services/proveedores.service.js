const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
class ProveedoresService {
  async create(data) {
    const dat = await models.Proveedor.create(data);
    if (!dat) {
      throw boom.notFound('Proveedor Not Found');
    }
    return dat;
  }
  async find(id) {
    const negocio = await models.Negocio.findByPk(id, {
      include: [{
        model: models.Proveedor,
        as: 'proveedores', // Asegúrate de que esta coincida con la definición de tu asociación en el modelo Negocio
        include: [
          {
            model: models.Perfil, // Agrega el modelo Perfil
            as: 'perfil', // Asegúrate de que esta coincida con la definición de tu asociación en el modelo Usuario
          },
        ],
      }],
    });
    if (!negocio) {
      throw boom.notFound('Negocio Not Found');
    }
    return negocio.proveedores;
  }
  async findOne(negocioId, proveedorId) {
    const proveedor = await models.Proveedor.findByPk(proveedorId, {
      include: ['perfil'],
    });
    if (!proveedor) {
      throw boom.notFound('proveedor Not Found');
    }
    if (proveedor.dataValues.negocioId != negocioId) {
      throw boom.notFound('El proveedor no pertence al negocio');
    }
    return proveedor;
  }
  async update(negocioId, proveedorId, change) {
    const proveedor = await this.findOne(negocioId, proveedorId);
    const rta = await proveedor.update(change);
    if (!rta) {
      throw boom.notFound('proveedor Not Found');
    }
    return rta;
  }
  async delete(negocioId, proveedorId) {
    const proveedor = await this.findOne(negocioId, proveedorId);
    const rta = await proveedor.destroy();
    if (!rta) {
      throw boom.notFound('proveedor Not Found');
    }
    return proveedor;
  }

  async sumarSaldo(negocioId, proveedorId, monto) {
    const proveedor = await this.findOne(negocioId, proveedorId);
    const rta = await proveedor.update({ saldo: proveedor.saldo + monto });
    if (!rta) {
      throw boom.notFound('No se pudo sumar saldo al proveedor: ' + proveedor);
    }
  }
  async restarSaldo(negocioId, proveedorId, monto) {
    const proveedor = await this.findOne(negocioId, proveedorId);
    const rta = await proveedor.update({ saldo: proveedor.saldo - monto });
    if (!rta) {
      throw boom.notFound('No se pudo restar saldo al proveedor: ' + proveedor);
    }
  }
}
module.exports = ProveedoresService;
