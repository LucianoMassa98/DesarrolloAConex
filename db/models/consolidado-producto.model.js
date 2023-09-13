const { Model, DataTypes, Sequelize } = require('sequelize');

const { CONSOLIDADO_TABLE } = require('./consolidado.model');

const { PRODUCTO_TABLE } = require('./producto.model');

const CONSOLIDADO_PRODUCTO_TABLE = 'consolidados_productos';

const consolidadoProductoSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  consolidadoId: {
    field: 'consolidado_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CONSOLIDADO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
  precio: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  costo: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.DOUBLE
  }
}

class ConsolidadoProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONSOLIDADO_PRODUCTO_TABLE,
      modelName: 'ConsolidadoProducto',
      timestamps: false
    }
  }
}

module.exports = { ConsolidadoProducto, consolidadoProductoSchema, CONSOLIDADO_PRODUCTO_TABLE };
