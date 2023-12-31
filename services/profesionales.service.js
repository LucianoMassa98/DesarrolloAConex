const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ProfesionalesService {
  async create(data) {
    const profesional = await models.Profesional.findOne({where:{clinicaId: data.clinicaId, perfilId: data.perfilId}});
    if(profesional){throw boom.notFound("Ya existe el profesional en la clinica");}
    const dat = await models.Profesional.create(data);
    if(!dat){throw boom.notFound('Pofesional not found');}
    return dat;
  }
  async find(clinicaId) {
    // falta devolver perfil
    //const rta = await models.Clinica.findByPk(clinicaId,{include:['profesionales']});
    const options = {
      where:{clinicaId:clinicaId},
      include:['perfil','horarios','ausencias']};

    const rta = await models.Profesional.findAll(options);

    if(!rta){throw boom.notFound('Clinica not found');}
    return rta;
  }
  async findOne(clinicaId, profesionalId,query) {

  const options= { include:['perfil']};
  const {ausencias, horarios, turnos} = query;
  if(ausencias){ options.include.push('ausencias')}
  if(horarios){ options.include.push('horarios')}
  if(turnos){ options.include.push('turnos')}

  const rta = await models.Profesional.findByPk(profesionalId,options);
  if(!rta){throw boom.notFound("Profesional not found");}
  if(clinicaId!=rta.clinicaId){throw boom.notFound("Profesional not found");}return rta;
  }
  async delete(clinicaId, profesionalId) {
    const profesional = await this.findOne(clinicaId,profesionalId,{});
    const rta = await profesional.destroy();
    if(!rta){throw boom.notFound('Pofesional not found');}
    return profesional;
  }
}
module.exports = ProfesionalesService;
