const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('./negocio.model');
const {CUENTA_TABLE}=require('./cuenta.model');
const {USUARIO_TABLE}=require('./usuario.model');

const GASTO_TABLE = 'gastos';
const gastoSchema  = {
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
    onDelete: 'CASCADE'

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
  cuentaEmisorId:{
    field: 'cuenta_emisor_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUENTA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  cuentaReceptorId:{
    field: 'cuenta_receptor_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUENTA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Gasto extends Model{
  // crear metodos estaticos
  static associate(models){
   this.belongsTo(models.Negocio, {as: 'negocio'});
  // this.belongsTo(models.Cuenta, {as: 'cuenta'});
   this.belongsTo(models.Usuario, {as: 'usuario'});

   this.belongsTo(models.Cuenta, { as: 'desde', foreignKey: 'cuentaEmisorId' });
   this.belongsTo(models.Cuenta, { as: 'a', foreignKey: 'cuentaReceptorId' });

  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  GASTO_TABLE,
      modelName: 'Gasto',
      timestamps: false
    }
  }
}
module.exports = {
  GASTO_TABLE,
  gastoSchema,
  Gasto
}
