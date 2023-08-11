'use strict';
const {CATEGORIA_TABLE,categoriaSchema}=require('../models/categoria.model');
const {CUENTA_TABLE,cuentaSchema}=require('../models/cuenta.model');
const {COMPRA_TABLE,compraSchema}=require('../models/compra.model');
const {COMPRA_PRODUCTO_TABLE,compraProductoSchema}=require('../models/compra-producto.model');
const {DESCUENTO_TABLE,descuentoSchema}=require('../models/descuento.model');
const {NEGOCIO_TABLE, negocioSchema}=require('../models/negocio.model');
const {PRODUCTO_TABLE,productoSchema}=require('../models/producto.model');
const {USUARIO_TABLE,usuarioSchema}=require('../models/usuario.model');
const {CLIENTE_TABLE,clienteSchema}=require('../models/cliente.model');
const {PROVEEDOR_TABLE,proveedorSchema}=require('../models/proveedor.model');
const {PAGO_TABLE,pagoSchema}=require('../models/pago.model');
const {COBRO_TABLE,cobroSchema}=require('../models/cobro.model');
const {VENTA_TABLE,ventaSchema}=require('../models/venta.model');
const {VENTA_PRODUCTO_TABLE,ventaProductoSchema}=require('../models/venta-producto');
const {GASTO_TABLE,gastoSchema}=require('../models/gasto.model');
const {ROLE_TABLE,roleSchema}=require('../models/role.model');
const {PERFIL_TABLE,perfilSchema}=require('../models/perfil.model');
const {ROLE_USUARIO_TABLE,roleUsuarioSchema}=require('../models/roleUsuario.model');
const {COBRO_PENDIENTE_TABLE,cobroPendienteSchema}=require('../models/cobroPendiente.model');
const {PAGO_PENDIENTE_TABLE,pagoPendienteSchema}=require('../models/pagoPendiente.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(NEGOCIO_TABLE,negocioSchema);
    await queryInterface.createTable(CUENTA_TABLE,cuentaSchema);
    await queryInterface.createTable(CATEGORIA_TABLE,categoriaSchema);
    await queryInterface.createTable(PRODUCTO_TABLE,productoSchema);
    await queryInterface.createTable(PERFIL_TABLE,perfilSchema);
    await queryInterface.createTable(USUARIO_TABLE,usuarioSchema);
    await queryInterface.createTable(CLIENTE_TABLE,clienteSchema);
    await queryInterface.createTable(PROVEEDOR_TABLE,proveedorSchema);
    await queryInterface.createTable(DESCUENTO_TABLE,descuentoSchema);
    await queryInterface.createTable(COMPRA_TABLE,compraSchema);
    await queryInterface.createTable(PAGO_TABLE,pagoSchema);
    await queryInterface.createTable(COMPRA_PRODUCTO_TABLE,compraProductoSchema);
    await queryInterface.createTable(VENTA_TABLE,ventaSchema);
    await queryInterface.createTable(COBRO_TABLE,cobroSchema);
    await queryInterface.createTable(VENTA_PRODUCTO_TABLE,ventaProductoSchema);
    await queryInterface.createTable(ROLE_TABLE,roleSchema);
    await queryInterface.createTable(GASTO_TABLE,gastoSchema);
    await queryInterface.createTable(ROLE_USUARIO_TABLE,roleUsuarioSchema);
    await queryInterface.createTable(COBRO_PENDIENTE_TABLE,cobroPendienteSchema);
    await queryInterface.createTable(PAGO_PENDIENTE_TABLE,pagoPendienteSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PAGO_PENDIENTE_TABLE);
    await queryInterface.dropTable(COBRO_PENDIENTE_TABLE);
    await queryInterface.dropTable(ROLE_USUARIO_TABLE);
    await queryInterface.dropTable(GASTO_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
    await queryInterface.dropTable(VENTA_PRODUCTO_TABLE);
    await queryInterface.dropTable(COBRO_TABLE);
    await queryInterface.dropTable(VENTA_TABLE);
    await queryInterface.dropTable(COMPRA_PRODUCTO_TABLE);
    await queryInterface.dropTable(PAGO_TABLE);
    await queryInterface.dropTable(COMPRA_TABLE);
    await queryInterface.dropTable(DESCUENTO_TABLE);
    await queryInterface.dropTable(PROVEEDOR_TABLE);
    await queryInterface.dropTable(CLIENTE_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
    await queryInterface.dropTable(PERFIL_TABLE);
    await queryInterface.dropTable(PRODUCTO_TABLE);
    await queryInterface.dropTable(CATEGORIA_TABLE);
    await queryInterface.dropTable(CUENTA_TABLE);
    await queryInterface.dropTable(NEGOCIO_TABLE);

  }
};
