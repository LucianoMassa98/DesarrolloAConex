const {Model,DataTypes, Sequelize} = require('sequelize');

const NEGOCIO_TABLE = 'negocios';
const negocioSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  celular:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "customer"
  },
  direccion:{
    allowNull: false,
    type: DataTypes.STRING,

  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Negocio extends Model{
  // crear metodos estaticos
  static associate(models){
    this.hasMany(models.Producto , {  as: 'productos', foreignKey: 'negocioId',onDelete: 'CASCADE' });
    this.hasMany(models.Categoria , {  as: 'categorias', foreignKey: 'negocioId',onDelete: 'CASCADE' });
    this.hasMany(models.Cliente , {  as: 'clientes', foreignKey: 'negocioId',onDelete: 'CASCADE' });
    this.hasMany(models.Proveedor , {  as: 'proveedores', foreignKey: 'negocioId',onDelete: 'CASCADE' });
    this.hasMany(models.Usuario, {as: 'usuarios', foreignKey: 'negocioId',onDelete: 'CASCADE'});
    this.hasMany(models.Cuenta, {as: 'cuentas', foreignKey: 'negocioId',onDelete: 'CASCADE'});
    this.hasMany(models.Descuento, {as: 'descuentos', foreignKey: 'negocioId',onDelete: 'CASCADE'});
    this.hasMany(models.Pago, {as: 'pagos', foreignKey: 'negocioId',onDelete: 'CASCADE'});
    this.hasMany(models.Compra, {as: 'compras', foreignKey: 'negocioId',onDelete: 'CASCADE'});
    this.hasMany(models.Venta, {as: 'ventas', foreignKey: 'negocioId',onDelete: 'CASCADE'});
    this.hasMany(models.Cobro, {as: 'cobros', foreignKey: 'negocioId',onDelete: 'CASCADE'});
    this.hasMany(models.Gasto, {as: 'gastos', foreignKey: 'negocioId',onDelete: 'CASCADE'});
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: NEGOCIO_TABLE,
      modelName: 'Negocio',
      timestamps: false
    }
  }
}
module.exports = {
  NEGOCIO_TABLE,
  negocioSchema,
  Negocio
}
