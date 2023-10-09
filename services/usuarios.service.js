const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class UsuariosService {
  async create(data) {
    console.log("-----------");
    console.log(data);
    const dat = await models.Usuario.create(data);
    if (!dat) {
      throw boom.notFound('Usuario o Contraseña not found');
    }
    const usuarioSinContraseña = {
      id: dat.id,
      clinica: dat.clinicaId,
      username: dat.username,
      createdAt: dat.createdAt

    };
    return usuarioSinContraseña;

  }
  async addRole(data) {
    const dat = await models.RoleUsuario.create(data);
    if (!dat) {
      throw boom.notFound('Usuario not found');
    }
    return dat;
  }
  async subtractRole(roleId, usuarioId) {
    const user = await models.RoleUsuario.findOne({
      where: {
        roleId: roleId,
        usuarioId: usuarioId,
      },
    });
    if (!user) {
      throw boom.notFound('User not found');
    }

    const rta = await user.destroy();
    if (!rta) {
      throw boom.notFound('Delete User not found');
    }
    return rta;
  }
  async login(username, password) {
    const user = await models.Usuario.findOne({
      where: { username: username },
      include: ['roles', 'perfil'],
    });
    if (!user) {
      throw boom.notFound('Usuario o Contraseña not found');
    }
    if (user.dataValues.password != password) {
      throw boom.notFound('Usuario o Contraseña not found');
    }
    const usuarioSinContraseña = {
      id: user.id,
      clinica: user.clinicaId,
      username: user.username,
      perfilId: user.perfilId,
      createdAt: user.createdAt,
      perfil: user.perfil,
      roles: user.roles
    };
    return usuarioSinContraseña;
  }
  async find(clinicaId) {
    const clinica = await models.Clinica.findByPk(clinicaId, {
      include: [{
        model: models.Usuario,
        as: 'usuarios', // Asegúrate de que esta coincida con la definición de tu asociación en el modelo clinica
        attributes: ['id','clinicaId','username'],
        include: [
          {
            model: models.Perfil, // Agrega el modelo Perfil
            as: 'perfil', // Asegúrate de que esta coincida con la definición de tu asociación en el modelo Usuario
          },
        ],
      }],
    });
    if (!clinica) {
      throw boom.notFound('clinica not found');
    }

    return clinica.usuarios;
  }
  async findOne(clinicaId, usuarioId) {
    const user = await models.Usuario.findByPk(usuarioId, {
      attributes: ['id','clinicaId','username'],
      include: ['perfil','roles'],
    });
    if (!user) {
      throw boom.notFound('User not found');
    }

    if (user.dataValues.clinicaId != clinicaId) {
      throw boom.notFound('El usuario no pertenece al clinica');
    }

   return user;
  }
  async update(clinicaId, usuarioId, changes) {
    const user = await this.findOne(clinicaId, usuarioId);
    const rta = await user.update(changes);
    if (!rta) {
      throw boom.notFound('User not found');
    }
    const usuarioSinContraseña = {
      id: rta.id,
      clinica: rta.clinicaId,
      username: rta.username,
      perfilId: rta.perfilId,
      createdAt: rta.createdAt,
      perfil: rta.perfil,
      role: rta.role
    };
    return usuarioSinContraseña;
  }
  async delete(clinicaId, usuarioId) {
    const user = await this.findOne(clinicaId, usuarioId);
    const rta = await user.destroy();
    if (!rta) {
      throw boom.notFound('User not found');
    }

    return user;
  }
}
module.exports = UsuariosService;
