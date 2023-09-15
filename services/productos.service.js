
const {models} = require('../libs/sequelize');
const {Op}=require('sequelize');
const boom = require('@hapi/boom');

class ProductoService{
  async create(data){
    const prod = await this.findOneCode(data.negocioId,data.codigo);

    if(prod){throw boom.notFound('El producto ya existe');}
    const newproducto = await models.Producto.create(data);
    if(!newproducto){throw boom.notFound('El producto no se pudo crear');}
    return newproducto;
  }
   async find(negocioId,query){
    const options= {
      association: 'productos',

    };
    const {limit,offset,valor,valor_min,valor_max} = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    if(valor){ options.where.valor= valor;}

    if(valor_min && valor_max){
      options.where.valor= {
        [Op.gte]: valor_min,
        [Op.lte]: valor_max
      };
    }

      const negocio  = await models.Negocio.findByPk(negocioId,{include:[options]});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.productos;
    }
  async findOne(negocioId,productoId){
    const producto  = await models.Producto.findByPk(productoId)
    if(!producto){ throw boom.notFound('Producto Not Found');}
    if(producto.negocioId!=negocioId){ throw boom.notFound('El producto no pertenece al negocio');}
     return producto;
  }
  async findOneCode(negocioId,codigo){
    const productos  = await this.find(negocioId,{});

    const producto = await productos.find((items) => items.codigo == codigo);

     return producto;
  }
  async update(negocioId,productoId, change){
   const producto = await this.findOne(negocioId,productoId);
   const rta = await producto.update(change);
   return rta;
  }
  async delete(negocioId,productoId){
    const producto = await this.findOne(negocioId,productoId);
    const rta = await producto.destroy();
    return producto;
  }

  async restarCantidad(negocioId,productoId,cantidad){
    const producto = await this.findOne(negocioId,productoId);
    rta = await producto.update({cantidad: producto.cantidad - cantidad});
    if(!rta){throw boom.notFound("No se pudo restar la cantidad del producto: "+producto);}
    return producto;
  }
  async sumarCantidad(negocioId,productoId,cantidad){
    const producto = await this.findOne(negocioId,productoId);
    rta = await producto.update({cantidad: producto.cantidad + cantidad});
    if(!rta){throw boom.notFound("No se pudo sumar la cantidad del producto: "+producto);}
    return producto;
  }

}
module.exports = ProductoService;
