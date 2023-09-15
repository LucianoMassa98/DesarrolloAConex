const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
class CategoriasService {
  async create(data) {
    const dat = await models.Categoria.create(data);
    if(!dat){throw boom.notFound("Categoria not found");}
    return dat;
  }
  async find(id) {
    const negocio = await models.Negocio.findByPk(id, {
      include: ['categorias'],
    });
    if (!negocio) {
      throw boom.notFound('Negocio Not Found');
    }
    return negocio.categorias;
  }
  async findOne(negocioId, categoriaId) {
    const categoria = await models.Categoria.findByPk(categoriaId);
    if (!categoria) {
      throw boom.notFound('categoria Not Found');
    }
    if (categoria.negocioId != negocioId) {
      throw boom.notFound('categoria no pertenece al negocio solicitado');
    }
    return categoria;
  }
  async update(negocioId, categoriaId, change) {
    const categoria = await this.findOne(negocioId, categoriaId);
    const rta = await categoria.update(change);
    if(!rta){throw boom.notFound("Categoria not found");}
    return rta;
  }
  async delete(negocioId, categoriaId) {
    const categoria = await this.findOne(negocioId, categoriaId);
    const rta = await categoria.destroy();
    if(!rta){throw boom.notFound("Categoria not found");}
    return categoria;
  }
}
module.exports = CategoriasService;
