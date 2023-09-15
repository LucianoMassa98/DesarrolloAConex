const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class UsuariosService {
  async create(data) {
    const dat = await models.Usuario.create(data);
    if (!dat) {
      throw boom.notFound('Usuario o Contraseña not found');
    }
    const usuarioSinContraseña = {
      id: dat.id,
      negocio: dat.negocioId,
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
      negocio: user.negocioId,
      username: user.username,
      perfilId: user.perfilId,
      createdAt: user.createdAt,
      perfil: user.perfil,
      roles: user.roles
    };
    return usuarioSinContraseña;
  }
  async find(negocioId) {
    const negocio = await models.Negocio.findByPk(negocioId, {
      include: [{
        model: models.Usuario,
        as: 'usuarios', // Asegúrate de que esta coincida con la definición de tu asociación en el modelo Negocio
        attributes: ['id','negocioId','username'],
        include: [
          {
            model: models.Perfil, // Agrega el modelo Perfil
            as: 'perfil', // Asegúrate de que esta coincida con la definición de tu asociación en el modelo Usuario
          },
        ],
      }],
    });
    if (!negocio) {
      throw boom.notFound('Negocio not found');
    }

    return negocio.usuarios;
  }
  async findOne(negocioId, usuarioId) {
    const user = await models.Usuario.findByPk(usuarioId, {
      attributes: ['id','negocioId','username'],
      include: ['perfil'],
    });
    if (!user) {
      throw boom.notFound('User not found');
    }

    if (user.dataValues.negocioId != negocioId) {
      throw boom.notFound('El usuario no pertenece al negocio');
    }

   return user;
  }
  async update(negocioId, usuarioId, changes) {
    const user = await this.findOne(negocioId, usuarioId);
    const rta = await user.update(changes);
    if (!rta) {
      throw boom.notFound('User not found');
    }
    const usuarioSinContraseña = {
      id: rta.id,
      negocio: rta.negocioId,
      username: rta.username,
      perfilId: rta.perfilId,
      createdAt: rta.createdAt,
      perfil: rta.perfil,
      role: rta.role
    };
    return usuarioSinContraseña;
  }
  async delete(negocioId, usuarioId) {
    const user = await this.findOne(negocioId, usuarioId);
    const rta = await user.destroy();
    if (!rta) {
      throw boom.notFound('User not found');
    }

    return user;
  }
}
module.exports = UsuariosService;
