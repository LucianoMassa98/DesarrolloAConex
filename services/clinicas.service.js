const boom  = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ClinicasService {
  async create(data) {
    const rta = await models.Clinica.create(data);
    if(!rta){throw boom.notFound("No se pudo crear la Clinica");}
    return rta;
  }
  async find() {
    const rta = await models.Clinica.findAll({include:['perfil']});
    if(!rta){throw boom.notFound('Clinica not found');}
    return rta;
  }
  async findOne(clinicaId) {
    const rta = await models.Clinica.findByPk(clinicaId,{include:['perfil']});

    if(!rta){ throw boom.notFound('Clinica not found'); }
    return rta;
  }

  async findOneCelular(celular) {
    const rta = await this.find();

    let i =0;
    while(i<rta.length && rta[i].perfil.celular != celular){i++;}

    if(i<rta.length){ return rta[i]; }else{throw boom.notFound('Clinica not found');}

  }
  async update(clinicaId, change){
    const Clinica = await this.findOne(clinicaId);
    const rta = await Clinica.update(change);
    if(!rta){ throw boom.notFound('Clinica not found');}
    return rta;
  }
  async delete(clinicaId) {
    const Clinica = await this.findOne(clinicaId);
    const rta = await Clinica.destroy();
    if(!rta){throw boom.notFound('Clinica not found');}
    return Clinica;
  }

}
module.exports = ClinicasService;
