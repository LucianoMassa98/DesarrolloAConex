const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

const CuentasService = require('../services/cuentas.service');
const cuentaservice = new CuentasService();
const ClientesService = require('../services/clientes.service');
const clienteservice = new ClientesService();
const ProductosService = require('../services/productos.service');
const productoservice = new ProductosService();

const CobrosService = require('../services/cobros.service');
const cobroservice = new CobrosService();
const CobrosPendientesService = require('../services/cobrosPendientes.service');
const cobropendienteservice = new CobrosPendientesService();
const UsuariosService = require('../services/usuarios.service');
const usuarioservice = new UsuariosService();

class VentasService {
  async create(data) {
    const dat = await models.Venta.create(data);
    if (!dat) {
      throw boom.notFound('Venta not found');
    }
    return dat;
  }
  async find(id, query) {
    const options = {
      association: 'ventas',
    };
    const { limit, offset, fecha, confirmDeposito, confirmCobro } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (fecha) {
      options.where.createdAt = {
        [Op.gte]: fecha,
        //[Op.lte]: fecha
      };
    }
    if (confirmDeposito && confirmCobro) {
      options.where.confirmCobro = confirmCobro;
      options.where.confirmDeposito = confirmDeposito;
    } else {
      if (confirmDeposito) {
        options.where.confirmDeposito = confirmDeposito;
      }
    }

    const includeOptions = [
      {
        model: models.Venta, // Modelo Venta
        as: 'ventas', // Alias 'ventas'
        include: [
          {
            model: models.Cliente, // Modelo Cliente
            as: 'cliente', // Alias 'cliente'
            include: ['perfil'], // Incluir el perfil del cliente
          },
          {
            model: models.Usuario, // Modelo Usuario
            as: 'usuario', // Alias 'usuario'
            attributes: ['id','negocioId','username'],
            include: [
              {
                model: models.Perfil, // Incluye el modelo de perfil del usuario
                as: 'perfil', // Alias 'perfil' para el modelo de perfil
              },
            ], // Incluir el perfil del usuario
          },
        ],
      },
    ];

    const negocio = await models.Negocio.findByPk(id, {
      include: includeOptions,
    });
    if (!negocio) {
      throw boom.notFound('Ventas Not Found');
    }

    return negocio.ventas;
  }
  async findOne(negocioId, ventaId) {
    const venta = await models.Venta.findByPk(ventaId, {
      include: [
        {
          model: models.Cliente, // Modelo Cliente
          as: 'cliente', // Alias 'cliente'
          include: ['perfil'], // Incluir el perfil del cliente
        },
        {
          model: models.Usuario, // Modelo Usuario
          as: 'usuario', // Alias 'usuario'
          attributes: ['id','negocioId','username'],
          include: [
            {
              model: models.Perfil, // Incluye el modelo de perfil del usuario
              as: 'perfil', // Alias 'perfil' para el modelo de perfil

            },
          ], // Incluir el perfil del usuario

        },
        'items',
        'cobros',
        'cobrosPendientes',
      ],
    });
    if (!venta) {
      throw boom.notFound('venta Not Found');
    }

    if (venta.negocioId != negocioId) {
      throw boom.notFound('venta Not Found');
    }
    return venta;
  }
  async update(negocioId, ventaId, change) {
    let venta = await this.findOne(negocioId, ventaId);
    const { confirmCobro, confirmDeposito } = change;
    let bandPendiente = false;

    // verificar que del lado del cliente los confirmCobro y confirmDeposito  no vengan vacios y sean true.
    // verificar que del servidor los confirmCobro, confirmCobroPendiente y confirmDeposito sean falsos
    // verificar que el

    if (
      confirmCobro &&
      !venta.confirmCobro &&
      !venta.confirmCobroPendiente &&
      confirmDeposito &&
      !venta.confirmDeposito &&
      (await venta.calcularTotalCobro()) == venta.total
    ) {
      // modificar cuentas asociadas y saldo de cliente de ser el caso
      venta.cobros.forEach(async (item) => {
        const cuenta = await cuentaservice.sumarDebe(
          venta.negocioId,
          item.cuentaId,
          item.monto
        );

        //si una cuenta es codigo "1.1.2 que pertenece a creditos por venta"
        if (cuenta.compararCodigo(['1', '1', '2'])) {
          await clienteservice.sumarSaldo(
            negociodId,
            venta.clieneId,
            item.monto
          );
          bandPendiente = true;
        }
      });

      // modificar productos asociadas: restar la cantidad del deposito
      venta.items.forEach(async (item) => {
        await productoservice.restarCantidad(
          venta.negocioId,
          item.id,
          item.VentaProducto.cantidad
        );
      });

      // modificar venta:confirmar , deposito y cobroPendientes de ser el caso
      venta = await venta.update({
        confirmCobro: true,
        confirmDeposito: true,
        confirmCobroPendiente: bandPendiente,
      });
      if (!venta) {
        throw boom.notFound('No se pudo actualizar la venta');
      }
    } else {
      throw boom.notFound('La venta ya fue confirmada');
    }

    return venta;
  }
  async delete(negocioId, ventaId) {
    const venta = await this.findOne(negocioId, ventaId);
    venta.items.forEach(async (item) => {
      const rta = await item.VentaProducto.destroy();
      if (!rta) {
        throw boom.notFound('No se pudo eliminar los productos');
      }
    });
    venta.cobros.forEach(async (item) => {
      const rta = await item.destroy();
      if (!rta) {
        throw boom.notFound('No se pudo elimianr los cobros');
      }
    });

    venta.cobrosPendientes.forEach(async (item) => {
      const rta = await item.destroy();
      if (!rta) {
        throw boom.notFound('No se pudo eliminar los cobros pendientes ');
      }
    });
    const rta = await venta.destroy();
    if (!rta) {
      throw boom.notFound('venta Not Found');
    }
    return venta;
  }
  async confirmVenta(data) {
    const venta = await this.findOne(data.negocioId, data.ventaId);

    if (venta.confirmCobro) {
      throw boom.notFound('Ya se realizo el cobro de esta venta');
    }
    if (venta.confirmCobroPendiente) {
      throw boom.notFound('Ya se realizo el cobro pendiente de esta venta');
    }
    if (venta.confirmDeposito) {
      throw boom.notFound(
        'Ya se realizo el extracción de productos y no se puede agregar cobros'
      );
    }
    // if(await venta.calcularTotalCobro() >= venta.total){ throw boom.notFound("El total de cobro supera al total de venta");}

    return venta;
  }
  //RELACIONES CON OTROS SERVICIOS

  // hacer prueba de las funciones de abajo

  async addItem(data) {
    const venta = await this.confirmVenta(data);
    const producto = await productoservice.findOne(
      data.negocioId,
      data.productoId
    );

    const dat = await models.VentaProducto.create({
      ventaId: data.ventaId,
      productoId: data.productoId,
      cantidad: data.cantidad,
      valor: data.valor,
    });
    if (!dat) {
      throw boom.notFound('Item not found');
    }
    const total = await venta.calcularTotal();
    // modificar total de la venta
    const rta = await venta.update({
      total: total + data.cantidad * data.valor,
    });
    if (!rta) {
      throw boom.notFound('total not found');
    }
    return rta;
  }
  async subItem(data) {
    const venta = await this.confirmVenta(data);
    const items = await models.VentaProducto.findAll({
      where: {
        ventaId: data.ventaId,
        productoId: data.productoId,
      },
    });
    if (!items) {
      throw boom.notFound('Item not found');
    }
    items.forEach(async (item) => {
      const rta = await item.destroy();
      if (!rta) {
        throw boom.notFound('Item not found');
      }
    });
    const total = await venta.calcularTotal();
    // modificar total de la venta
    const rta = await venta.update({
      total: total - data.cantidad * data.valor,
    });
    if (!rta) {
      throw boom.notFound('total not found');
    }

    return items;
  }
  async addCobro(data) {
    const venta = await this.confirmVenta(data);
    if ((await venta.calcularTotalCobro()) + data.monto > venta.total) {
      throw boom.notAcceptable('El total de cobro supera al total de venta');
    }
    return await cobroservice.create(data);
  }
  async subCobro(data) {
    const venta = await this.confirmVenta(data);

    return await cobroservice.delete(data.negocioId, data.cobroId);
  }
  async addCobroPendiente(data) {
    const venta = await this.findOne(data.negocioId, data.ventaId);
    if (!venta.confirmCobroPendiente) {
      throw boom.notFound('No hay cobro pendiente para esta venta');
    }

    if (await cuentaservice.comparar(data.cuentaId, ['1', '1', '2'])) {
      throw boom.notFound(
        'No se permite este tipo de cuenta en los cobrosp endientes'
      );
    }

    const totalDeuda = await venta.calcularTotalDeuda(cuentaservice);
    const totalPagado = await venta.calcularTotalPagado();
    if (totalDeuda < totalPagado + data.monto) {
      throw boom.notFound('Monto demasiado grante');
    }
    if (totalDeuda == totalPagado + data.monto) {
      // si con el pago, se alcanza el total de la deuda modificar el pendiente a falso
      const rta = await venta.update({ confirmCobroPendiente: false });
      if (!rta) {
        throw boom.notFound('No se pudo actualizar el pendiente de la venta');
      }
    }

    // sumar el debe en la cuenta de efectivo o mercado pago
    await cuentaservice.sumarDebe(data.negocioId, data.cuentaId, data.monto);
    // restar el saldo al cliente que abono
    await clienteservice.restarSaldo(
      data.negocioId,
      venta.clieneId,
      data.monto
    );
    const ctaCreditoPorVenta = await cuentaservice.findOneCodigo(
      data.negocioId,
      ['1', '1', '2']
    );
    // sumar el haber a la cuenta credito por venta
    await cuentaservice.sumarHaber(
      data.negocioId,
      ctaCreditoPorVenta.id,
      data.monto
    );
    return await cobropendienteservice.create(data);
  }
  async subCobroPendiente(data) {
    const venta = await this.findOne(data.negocioId, data.ventaId);
    const rta = await cobropendienteservice.delete(
      data.negocioId,
      data.cobroPendienteId
    );
    if (!rta) {
      throw boom.notFound('no se pudo borrar cobro pendiente');
    }
    await cuentaservice.restarDebe(data.negocioId, data.cuentaId, data.monto);
    await clienteservice.sumarSaldo(
      data.negocioId,
      venta.clienteId,
      data.monto
    );
    const ctaCreditoPorVenta = await cuentaservice.findOneCodigo(
      data.negocioId,
      ['1', '1', '2']
    );
    await cuentaservice.restarHaber(
      data.negocioId,
      ctaCreditoPorVenta.id,
      data.monto
    );
    return rta;
  }
}
module.exports = VentasService;
