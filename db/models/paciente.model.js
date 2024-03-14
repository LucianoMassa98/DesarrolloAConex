const {Model,DataTypes, Sequelize} = require('sequelize');
const {CLINICA_TABLE}=require('../models/clinica.model');
const {PERFIL_TABLE}=require('../models/perfil.model');

const PACIENTE_TABLE = 'pacientes';


const pacienteSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  clinicaId:{
    field: 'clinica_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CLINICA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'

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
  CondIVA: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Paciente extends Model{
  // crear metodos estaticos
  static associate(models){

    this.belongsTo(models.Clinica, {as: 'clinica'});
    this.belongsTo(models.Perfil, {as: 'perfil'});
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: PACIENTE_TABLE,
      modelName: 'Paciente',
      timestamps: false
    }
  }
}
module.exports = {
  PACIENTE_TABLE,
  pacienteSchema,
  Paciente
}
