'use strict';
const {CLINICA_TABLE, clinicaSchema}=require('../models/clinica.model');
const {USUARIO_TABLE,usuarioSchema}=require('../models/usuario.model');
const {ROLE_TABLE,roleSchema}=require('../models/role.model');
const {PERFIL_TABLE,perfilSchema}=require('../models/perfil.model');
const {ROLE_USUARIO_TABLE,roleUsuarioSchema}=require('../models/roleUsuario.model');
const {AUSENCIA_TABLE, ausenciaSchema}=require('../models/ausencia.model');
const {HORARIO_TABLE,horarioSchema}=require('../models/horario.model');
const {TURNO_TABLE,turnoSchema}=require('../models/turno.model');
const {PACIENTE_TABLE,pacienteSchema}=require('../models/paciente.model');
const {PROFESIONAL_TABLE,profesionalSchema}=require('../models/profesional.model');
const {ESPECIALIDAD_TABLE,especialidadSchema}=require('../models/especialidad.model');
const {FERIADO_TABLE,feriadoSchema}=require('../models/feriado.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PERFIL_TABLE,perfilSchema);
    await queryInterface.createTable(CLINICA_TABLE,clinicaSchema);
    await queryInterface.createTable(ROLE_TABLE,roleSchema);
    await queryInterface.createTable(ESPECIALIDAD_TABLE,especialidadSchema);
    await queryInterface.createTable(USUARIO_TABLE,usuarioSchema);
    await queryInterface.createTable(ROLE_USUARIO_TABLE,roleUsuarioSchema);
    await queryInterface.createTable(PROFESIONAL_TABLE,profesionalSchema);
    await queryInterface.createTable(PACIENTE_TABLE,pacienteSchema);
    await queryInterface.createTable(HORARIO_TABLE,horarioSchema);
    await queryInterface.createTable(TURNO_TABLE,turnoSchema);
    await queryInterface.createTable(AUSENCIA_TABLE,ausenciaSchema);
    await queryInterface.createTable(FERIADO_TABLE,feriadoSchema);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable(FERIADO_TABLE);
   await queryInterface.dropTable(AUSENCIA_TABLE);
    await queryInterface.dropTable(TURNO_TABLE);
    await queryInterface.dropTable(HORARIO_TABLE);
    await queryInterface.dropTable(PACIENTE_TABLE);
    await queryInterface.dropTable(PROFESIONAL_TABLE);
    await queryInterface.dropTable(ROLE_USUARIO_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
    await queryInterface.dropTable(ESPECIALIDAD_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
    await queryInterface.dropTable(CLINICA_TABLE);
    await queryInterface.dropTable(PERFIL_TABLE);

  }
};
