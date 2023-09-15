const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class PerfilesService {

  async create(data){

    const dat = await models.Perfil.create(data);
    if(!dat){throw boom.notFound('Perfil not found'); }
    return dat;
  }

  async findOne(perfilId){


    const perfil = await models.Perfil.findByPk(perfilId);
    if(!perfil){ throw boom.notFound('perfil not found'); }
    return perfil;
  }
  async update(perfilId,changes){
    const perfil = await this.findOne(perfilId);
    const rta = await perfil.update(changes);
    if(!rta){throw boom.notFound('Perfil not found');}
    return rta;
  }
  async delete(perfilId){
    const perfil = await this.findOne(perfilId);
    const rta = await perfil.destroy();
    if(!rta){throw boom.notFound('Perfil not found');}
    return perfil;
  }
}
module.exports = PerfilesService;
