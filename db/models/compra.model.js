const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('../models/negocio.model');
const {PROVEEDOR_TABLE}=require('../models/proveedor.model');
const {USUARIO_TABLE}=require('../models/usuario.model');
const COMPRA_TABLE = 'compras';
const compraSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
    onDelete: 'SET NULL'

  },
  proveedorId:{
    field: 'proveedor_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROVEEDOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  usuarioId:{
    field: 'usuario_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USUARIO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  confirmDeposito: {
    allowNull: false,
    field: 'confirm_depopsito',
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  confirmPago: {
    allowNull: false,
    field: 'confirm_pago',
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  confirmPagoPendiente: {
    allowNull: false,
    field: 'confirm_pago_pendiente',
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  total:{
    allowNull: false,
    type: DataTypes.DOUBLE,
    defaultValue: 0
  }
}

class Compra extends Model{
  // crear metodos estaticos
  static associate(models){
    this.hasMany(models.Pago, { as: 'pagos', foreignKey: 'compraId'});
    this.hasMany(models.PagoPendiente, { as: 'pagosPendientes', foreignKey: 'compraId' });

    this.belongsTo(models.Negocio, {as: 'negocio'});
    this.belongsTo(models.Proveedor, {as: 'proveedor'});
    this.belongsTo(models.Usuario, {as: 'usuario'});
    this.belongsToMany(models.Producto, {
      as: 'items',
      through: models.CompraProducto,
      foreignKey: 'compraId',
      otherKey: 'productoId'
    });
  }

  async calcularTotal(){
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.CompraProducto.cantidad * item.CompraProducto.valor);
        }, 0);
      }
      return 0;
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  COMPRA_TABLE,
      modelName: 'Compra',
      timestamps: false
    }
  }
}
module.exports = {
  COMPRA_TABLE,
  compraSchema,
  Compra
}
