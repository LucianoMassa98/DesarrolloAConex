const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const {Op} = require('sequelize');
const CuentasService = require('../services/cuentas.service');
const cuentasService = new CuentasService();
const NegociosService = require('../services/negocios.service');
const negociosService = new NegociosService();

class CapitalesService {
  async create() {
    const negocios = await negociosService.find();
    negocios.forEach(async element => {
      const negocioId = element.id;
      const newCapital = await models.Capital.create(negocioId);
      if(!newCapital){ throw boom.notFound("No se pudo crear el capital");}
      const cuentas = await cuentasService.find(negocioId);
      cuentas.forEach(async element => {
          await this.addItem(newCapital.id, element);
          newCapital =  await newCapital.update({saldo: newCapital.saldo+element.saldo});
        });
    });

  }
  async find(negocioId, query) {
    const options={
      where:{negocioId: negocioId}
    };
    const {fecha_min, fecha_max}=query;
    if(!fecha_min && !fecha_max){
      options.where={
        ...options.where,
        createdAt:{
          [Op.lte]: fecha_min,
          [Op.gte]: fecha_max
        }
      };
    }
    const capitales = await models.Capital.find(options);
    if(!capitales){ throw boom.notFound("No se encontraron capitales para este negocio");}
    return capitales;
  }
  async findOne(negocioId, capitalId) {
    const capital = await models.Capital.findByPk(capitalId,{include:['items']});
    if(!capital){ throw boom.notFound("No se encontro el capital");}
    if(capital.negocioId!=negocioId){ throw boom.notFound("Acceso denegado para este negocio");}
    return capital;
  }
  async update(negocioId, capitalId, change) {
    const capital = await this.findOne(negocioId,capitalId);
    const newCapital = await capital.update(change);
    if(!newCapital){ throw boom.notFound("No se pudo actualizar el capital");}
    return capital;
  }
  async delete(negocioId, capitalId) {
    const capital = await this.findOne(negocioId,capitalId);
    capital.items.forEach(async element => {
      const rta = await items.destroy();
      if(!rta){ throw boom.notFound("No se pudo eliminar los items del consolidado");}
    });
    const rta = await capital.destroy();
    if(!rta){throw boom.notFound("No se pudo eliminar el capital");}
    return capital;
  }

  async addItem(capitalId, cuenta) {
    const newCapitalCuenta = await models.CapitalCuenta.create({
      capitalId: capitalId,
      cuentaId: cuenta.id,
      debe: cuenta.debe,
      haber: cuenta.haber
    });
    if(!newCapitalCuenta){throw boom.notFound("No se pudo agregar correctamente las cuentas al capital!");}

  }



}
module.exports = CapitalesService;
