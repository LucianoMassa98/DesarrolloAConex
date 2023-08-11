const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
const {Op}=require('sequelize');

const CuentasService = require('../services/cuentas.service');
const cuentaservice = new CuentasService();
const ProveedoresService = require('../services/proveedores.service');
const proveedorservice = new ProveedoresService();
const ProductosService = require('../services/productos.service');
const productoservice = new ProductosService();

const PagosService = require('../services/pagos.service');
const pagoservice = new PagosService();
const PagosPendientesService = require('../services/pagosPendientes.service');
const pagopendienteservice = new PagosPendientesService();


class ComprasService {
  async create(data){
    const dat = await models.Compra.create(data);
    if(!dat){throw boom.notFound('Compra Not Found');}
    return dat;
  }
  async addItem(data){
    const dat = await models.CompraProducto.create(data);
    const compra = await models.Compra.findByPk(data.compraId,{
        include:['items']
    });
   const total =  await compra.calcularTotal();
   const rta = await compra.update({total});

    return rta;
  }
  async subtractItems(data){
    const items = await models.CompraProducto.findAll({
      where:{
        compraId: data.compraId,
        productoId: data.productoId
      }
    });
    items.forEach(async (item) => {
      await item.destroy();
    });
    return true;
  }
   async find(id,query){

    const options= {
      association: 'compras'
    };
    const {limit,offset,fecha,confirmDeposito,confirmPago} = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    if(fecha){ options.where.createdAt= {
      [Op.gte]: fecha,
      //[Op.lte]: fecha
    }}

    if(confirmDeposito && confirmPago){
      options.where.confirmPago= confirmPago;
      options.where.confirmDeposito = confirmDeposito;
    }else{
      if(confirmDeposito){options.where.confirmDeposito = confirmDeposito;}
    }
      const negocio  = await models.Negocio.findByPk(id,{include:[options]});
      if(!negocio){ throw boom.notFound('Compras Not Found');}
      return negocio.compras;
    }
  async findOne(negocioId,compraId){
    const compra = await models.Compra.findByPk(compraId,{
      include:[{association: 'proveedor'},'items','pagos']
    });

    if(!compra){ throw boom.notFound('Compra Not Found');}

    if(compra.negocioId!=negocioId){throw boom.notFound('La compra no pertenece al negocio');}

    if(!compra){ throw boom.notFound('compra Not Found');}
     return compra;
  }
  async update(negocioId,compraId, change){
   const compra = await this.findOne(negocioId,compraId);
   const rta = await compra.update(change);
   return rta;
  }
  async delete(negocioId,compraId){
    const compra = await this.findOne(negocioId,compraId);
    compra.items.forEach(async (item) => {
      await item.CompraProducto.destroy();
    });
    const rta = await compra.destroy();
    return rta;
  }
  async confirmCompra(data){
    const compra = await this.findOne(data.negocioId,data.compraId);

    if(compra.confirmPago){ throw boom.notFound("Ya se realizo el Pago de esta compra");}
    if(compra.confirmPagoPendiente){ throw boom.notFound("Ya se realizo el Pago pendiente de esta compra");}
    if(compra.confirmDeposito){ throw boom.notFound("Ya se realizo el extracción de productos y no se puede agregar Pagos");}
   // if(await compra.calcularTotalPago() >= compra.total){ throw boom.notFound("El total de Pago supera al total de compra");}

    return compra;
  }
  //RELACIONES CON OTROS SERVICIOS


  async addItem(data) {
    const compra = await this.confirmcompra(data);
    const producto = await productoservice.findOne(data.negocioId,data.productoId);


    const dat = await models.compraProducto.create({compraId: data.compraId, productoId: data.productoId, cantidad: data.cantidad, valor: data.valor});
    if (!dat) {
      throw boom.notFound('Item not found');
    }
    const total = await compra.calcularTotal();
    // modificar total de la compra
    const rta = await compra.update({ total: total+data.cantidad*data.valor });
    if (!rta) {
      throw boom.notFound('total not found');
    }
    return rta;
  }
  async subItem(data) {

    const compra = await this.confirmcompra(data);
    const items = await models.compraProducto.findAll({
      where: {
        compraId: data.compraId,
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
    const total = await compra.calcularTotal();
    // modificar total de la compra
    const rta = await compra.update({ total: total-data.cantidad*data.valor });
    if (!rta) {
      throw boom.notFound('total not found');
    }

    return true;
  }
  async addPago(data){
    const compra = await this.confirmcompra(data);
    if(await compra.calcularTotalPago()+data.monto > compra.total){ throw boom.notAcceptable("El total de Pago supera al total de compra");}
    return await Pagoservice.create(data);

  }
  async subPago(data){
    const compra = await this.confirmcompra(data);

    return await Pagoservice.delete(data.negocioId,data.PagoId);

  }
  async addPagoPendiente(data){
    const compra = await this.findOne(data.negocioId,data.compraId);
    if(!compra.confirmPagoPendiente){ throw boom.notFound("No hay Pago pendiente para esta compra");}

    if(await cuentaservice.comparar(data.cuentaId,['1','1','2'])){
      throw boom.notFound("No se permite este tipo de cuenta en los Pagosp endientes");
    }

    const totalDeuda = await compra.calcularTotalDeuda(cuentaservice);
    const totalPagado =  await compra.calcularTotalPagado();
    if( totalDeuda < totalPagado+ data.monto ){
      throw boom.notFound("Monto demasiado grante");
    }
    if(totalDeuda == totalPagado + data.monto){
      // si con el pago, se alcanza el total de la deuda modificar el pendiente a falso
      const rta = await compra.update({confirmPagoPendiente:false});
      if(!rta){throw boom.notFound("No se pudo actualizar el pendiente de la compra");}
    }

      // sumar el debe en la cuenta de efectivo o mercado pago
    await cuentaservice.sumarDebe(data.negocioId,data.cuentaId,data.monto);
    // restar el saldo al cliente que abono
    await clienteservice.restarSaldo(data.negocioId,compra.clieneId, data.monto)
    const ctaCreditoPorcompra = await cuentaservice.findOneCodigo(data.negocioId,['1','1','2']);
    // sumar el haber a la cuenta credito por compra
    await cuentaservice.sumarHaber(data.negocioId,ctaCreditoPorcompra.id,data.monto);
    return await Pagopendienteservice.create(data);

  }
  async subPagoPendiente(data){
    const compra = await this.findOne(data.negocioId,data.compraId);
    const rta = await Pagopendienteservice.delete(data.negocioId,data.PagoPendienteId);
    if(!rta){throw boom.notFound("no se pudo borrar Pago pendiente");}
    await cuentaservice.restarDebe(data.negocioId,data.cuentaId,data.monto);
    await clienteservice.sumarSaldo(data.negocioId,compra.clienteId, data.monto)
    const ctaCreditoPorcompra = await cuentaservice.findOneCodigo(data.negocioId,['1','1','2']);
    await cuentaservice.restarHaber(data.negocioId,ctaCreditoPorcompra.id,data.monto);
    return rta;

  }
}
module.exports = ComprasService;
