const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('../models/negocio.model');
const CUENTA_TABLE = 'cuentas';
const cuentaSchema  = {
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
  codigo:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true

  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  debe: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  haber: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Cuenta extends Model{
  // crear metodos estaticos
  static associate(models){
    this.belongsTo(models.Negocio, {as: 'negocio'});

    this.hasMany(models.Pago, {as: 'pagos', foreignKey: 'cuentaId'});
    this.hasMany(models.Cobro, {as: 'cobros', foreignKey: 'cuentaId'});


  }

  async compararCodigo(arrayCodigo){
  const array = this.codigo.split('.');
    if(array.length<=arrayCodigo.length){
      for(let i =0; i<arrayCodigo.length; i++){
        if(arrayCodigo[i]!=array[i]){return false; }
      }
      return true;
    }
    return false;

  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  CUENTA_TABLE,
      modelName: 'Cuenta',
      timestamps: false
    }
  }
}
module.exports = {
  CUENTA_TABLE,
  cuentaSchema,
  Cuenta
}
