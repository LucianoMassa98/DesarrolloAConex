const { Model, DataTypes, Sequelize } = require('sequelize');

const { CONSOLIDADO_TABLE } = require('./consolidado.model');

const { VENTA_TABLE } = require('./venta.model');

const CONSOLIDADO_VENTA_TABLE = 'consolidados_ventas';

const consolidadoVentaSchema =  {
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
  }
}

class ConsolidadoVenta extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONSOLIDADO_VENTA_TABLE,
      modelName: 'ConsolidadoVenta',
      timestamps: false
    }
  }
}

module.exports = { ConsolidadoVenta, consolidadoVentaSchema, CONSOLIDADO_VENTA_TABLE };
