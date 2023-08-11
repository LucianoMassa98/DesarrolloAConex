const { Model, DataTypes, Sequelize } = require('sequelize');

const { VENTA_TABLE } = require('./venta.model');
const { PRODUCTO_TABLE } = require('./producto.model');

const VENTA_PRODUCTO_TABLE = 'ventas_productos';

const ventaProductoSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  ventaId: {
    field: 'venta_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: VENTA_TABLE,
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

class VentaProducto extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VENTA_PRODUCTO_TABLE,
      modelName: 'VentaProducto',
      timestamps: false
    }
  }
}

module.exports = { VentaProducto, ventaProductoSchema, VENTA_PRODUCTO_TABLE };
