const { Model, DataTypes, Sequelize } = require('sequelize');

const { COMPRA_TABLE } = require('./compra.model');
const { PRODUCTO_TABLE } = require('./producto.model');

const COMPRA_PRODUCTO_TABLE = 'compras_productos';

const compraProductoSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  compraId: {
    field: 'compra_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COMPRA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  productoId: {
    field: 'producto_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  valor: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}

class CompraProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPRA_PRODUCTO_TABLE,
      modelName: 'CompraProducto',
      timestamps: false
    }
  }
}

module.exports = { CompraProducto, compraProductoSchema, COMPRA_PRODUCTO_TABLE };
