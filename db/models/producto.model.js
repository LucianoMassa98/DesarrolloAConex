const {Model,DataTypes, Sequelize} = require('sequelize');
const {CATEGORIA_TABLE} = require('./categoria.model');
const {NEGOCIO_TABLE} = require('./negocio.model');
const PRODUCTO_TABLE = 'productos';
const productoSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  categoriaId:{
    field: 'categoria_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORIA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  negocioId:{
    field: 'negocio_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NEGOCIO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'

  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  codigo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  margen: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Producto extends Model{
  // crear metodos estaticos
  static associate(models){
  this.belongsTo(models.Categoria, {as: 'categoria'});
  this.belongsTo(models.Negocio, {as: 'negocio'});

  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'Producto',
      timestamps: false
    }
  }
}
module.exports = {
  PRODUCTO_TABLE,
  productoSchema,
  Producto
}
