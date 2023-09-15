const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class CuentasService {
  async create(data){
    const rta = await models.Cuenta.create(data);
    if(!rta){throw boom.conflict('Not Create, Error!');}
    return rta;
  }
  async find(negocioId){
    const negocio = await models.Negocio.findByPk(negocioId, {include: ['cuentas']});
    if(!negocio){throw boom.notFound('Negocio Not Found');}
    return negocio.cuentas;


  }
  async findOne(negocioId,cuentaId){
    const cuenta  = await models.Cuenta.findByPk(cuentaId);
    if(!cuenta){ throw boom.notFound('Cuenta Not Found');}
    if(cuenta.negocioId!=negocioId){ throw boom.notFound('La cuenta no pertenece al negocio');}
     return cuenta;
  }
  async findOneCodigo(negocioId,codigo){
    const cuentas  = await this.find(negocioId);
    if(!cuentas){ throw boom.notFound('Cuentas Not Found');}

    cuentas.forEach(async (item) => {

      if (item.compararCodigo(codigo)) {
         return item;
      }
    });

     throw boom.notFound("Cuenta not found");
  }
  async update(negocioId,cuentaId, change){
   const cuenta = await this.findOne(negocioId,cuentaId);
   const rta = await cuenta.update(change);
   if(!rta){ throw boom.notFound('Cuenta Not Found');}
   return rta;
  }
  async delete(negocioId,cuentaId){
    const cuenta = await this.findOne(negocioId,cuentaId);
    const rta = await cuenta.destroy();
    if(!rta){ throw boom.notFound('Cuenta Not Found');}
    return cuenta;
  }

  async comparar(cuentaId,arrayCode){
    const cuenta = await models.Cuenta.findByPk(cuentaId);
    if(!cuenta){throw boom.notFound("Cuenta not found");}

   return cuenta.compararCodigo(arrayCode);
  }
  async sumarDebe(negocioId,cuentaId, monto){
    const cuenta = await this.findOne(negocioId, cuentaId);
    const rta = await cuenta.update({debe: cuenta.debe+ monto});
    if(!rta){throw boom.notFound("No se pudo sumar el debe de la cuenta: "+cuenta.nombre);}
    return cuenta;
  }
  async restarDebe(negocioId,cuentaId, monto){
    const cuenta = await this.findOne(negocioId, cuentaId);
    const rta = await cuenta.update({debe: cuenta.debe- monto});
    if(!rta){throw boom.notFound("No se pudo restar el debe de la cuenta: "+cuenta.nombre);}
    return cuenta;
  }

  async sumarHaber(negocioId,cuentaId, monto){
    const cuenta = await this.findOne(negocioId, cuentaId);
    const rta = await cuenta.update({haber: cuenta.haber+ monto});
    if(!rta){throw boom.notFound("No se pudo sumar el haber de la cuenta: "+cuenta.nombre);}
    return cuenta;
  }
  async restarHaber(negocioId,cuentaId, monto){
    const cuenta = await this.findOne(negocioId, cuentaId);
    const rta = await cuenta.update({haber: cuenta.haber- monto});
    if(!rta){throw boom.notFound("No se pudo restar el debe de la cuenta: "+cuenta.nombre);}
    return cuenta;
  }
}
module.exports = CuentasService;
