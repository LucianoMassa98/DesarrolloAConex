const { Model, DataTypes, Sequelize } = require('sequelize');
const { NEGOCIO_TABLE } = require('../models/negocio.model');
const { CLIENTE_TABLE } = require('../models/cliente.model');
const { USUARIO_TABLE } = require('../models/usuario.model');
const VENTA_TABLE = 'ventas';
const ventaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  negocioId: {
    field: 'negocio_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NEGOCIO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  clienteId: {
    field: 'cliente_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CLIENTE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  usuarioId: {
    field: 'usuario_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USUARIO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  confirmDeposito: {
    allowNull: false,
    field: 'confirm_depopsito',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  confirmCobro: {
    allowNull: false,
    field: 'confirm_cobro',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  confirmCobroPendiente: {
    allowNull: false,
    field: 'confirm_cobro_pendiente',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  total: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
};

class Venta extends Model {
  // crear metodos estaticos
  static associate(models) {
    this.hasMany(models.Cobro, { as: 'cobros', foreignKey: 'ventaId' });
    this.hasMany(models.CobroPendiente, { as: 'cobrosPendientes', foreignKey: 'ventaId' });
    this.belongsTo(models.Negocio, { as: 'negocio' });
    this.belongsTo(models.Cliente, { as: 'cliente' });
    this.belongsTo(models.Usuario, { as: 'usuario' });
    this.belongsToMany(models.Producto, {
      as: 'items',
      through: models.VentaProducto,
      foreignKey: 'ventaId',
      otherKey: 'productoId',
    });
  }
  async calcularTotal() {
    if (this.items.length > 0) {
      return this.items.reduce((total, item) => {
        return total + item.VentaProducto.cantidad * item.VentaProducto.valor;
      }, 0);
    }
    return 0;
  }

  async calcularTotalCobro() {
    if (this.cobros.length > 0) {
      return this.cobros.reduce((sum, item) => {
        return sum + item.monto;
      }, 0);
    }
    return 0;
  }

  async calcularTotalDeuda(cuentaservicio) {
    if (this.cobros.length > 0) {
      return this.cobros.reduce((sum, item) => {
        if(cuentaservicio.comparar(item.cuentaId,['1','1','2'])){
          return sum + 0;
        }
        return sum + item.monto;
      }, 0);
    }
    return 0;
  }
  async calcularTotalPagado() {
    if (this.cobrosPendientes.length > 0) {
      return this.cobrosPendientes.reduce((sum, item) => {
        return sum + item.monto;
      }, 0);
    }
    return 0;
  }

  // definir otrto estatico para la conexin
  static config(sequelize) {
    return {
      sequelize,
      tableName: VENTA_TABLE,
      modelName: 'Venta',
      timestamps: false,
    };
  }
}
module.exports = {
  VENTA_TABLE,
  ventaSchema,
  Venta,
};
