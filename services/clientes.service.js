const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class ClientesService {
  async create(data){
    const dat = await models.Cliente.create(data);
    if(!dat){throw boom.notFound('Cliente Not Found');}
    return dat;
  }
   async find(negocioId){
      const negocio  = await models.Negocio.findByPk(negocioId,{include:['clientes']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.clientes;
    }
  async findOne(negocioId,clienteId){
    const cliente  = await models.Cliente.findByPk(clienteId,{include:['perfil']});

    if(!cliente){ throw boom.notFound('cliente Not Found');}
    if(cliente.dataValues.negocioId!=negocioId){ throw boom.notFound('el cliente no pertenece al negocio');}
    return cliente;
  }
  async delete(negocioId,clienteId){
    const cliente = await this.findOne(negocioId,clienteId);
    const rta = await cliente.destroy();
    if(!rta){ throw boom.notFound('cliente Not Found');}
    return cliente;
  }

  async sumarSaldo(negocioId,clienteId,monto){
    const cliente = await this.findOne(negocioId,clienteId);
    const rta = await cliente.update({saldo: cliente.saldo+monto});
    if(!rta){throw boom.notFound("No se pudo sumar saldo al cliente: "+cliente);}

  }
  async restarSaldo(negocioId,clienteId,monto){
    const cliente = await this.findOne(negocioId,clienteId);
    const rta = await cliente.update({saldo: cliente.saldo-monto});
    if(!rta){throw boom.notFound("No se pudo restar saldo al cliente: "+cliente);}

  }
}
module.exports = ClientesService;
