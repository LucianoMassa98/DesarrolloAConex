const {Model,DataTypes, Sequelize} = require('sequelize');


const PERFIL_TABLE = 'perfiles';
const perfilSchema  = {
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
  apellido: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  cedula: {
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  celular: {
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  direccion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nacimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}

class Perfil extends Model{
  // crear metodos estaticos
  static associate(models){
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: PERFIL_TABLE,
      modelName: 'Perfil',
      timestamps: false
    }
  }
}
module.exports = {
  PERFIL_TABLE,
  perfilSchema,
  Perfil
}
