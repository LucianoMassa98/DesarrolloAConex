const {Model,DataTypes, Sequelize} = require('sequelize');
const {PERFIL_TABLE}=require('./perfil.model');

const CLINICA_TABLE = 'clinicas';
const clinicaSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  perfilId:{
    field: 'perfil_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERFIL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'

  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  condicionFiscal: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  region:{
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Clinica extends Model{
  // crear metodos estaticos
  static associate(models){
    this.hasMany(models.Usuario, {as: 'usuarios', foreignKey: 'clinicaId',onDelete: 'CASCADE'});

    this.hasMany(models.Especialidad, {as: 'especialidades', foreignKey: 'clinicaId',onDelete: 'CASCADE'});
    this.hasMany(models.Profesional, {as: 'profesionales', foreignKey: 'clinicaId',onDelete: 'CASCADE'});
    this.hasMany(models.Paciente, {as: 'pacientes', foreignKey: 'clinicaId',onDelete: 'CASCADE'});
    this.belongsTo(models.Perfil, {as: 'perfil'});


  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: CLINICA_TABLE,
      modelName: 'Clinica',
      timestamps: false
    }
  }
}
module.exports = {
  CLINICA_TABLE,
  clinicaSchema,
  Clinica
}
