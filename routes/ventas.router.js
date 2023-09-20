const express = require('express');
const router = express.Router();
const VentasService = require('../services/ventas.service');
const service = new VentasService();
const {
  createventaSchema,
  updateventaSchema,
  getventaSchema,
  queryCompraSchema,
  addItemSchema,
  subItemSchema,
  addCobroSchema,
  subCobroSchema,
  addCobroPendienteSchema,
  subCobroPendienteSchema,
} = require('../schemas/venta.schema');

const { getnegocioSchema } = require('../schemas/negocio.schema');

const validatorHandler = require('../middlewares/validator.handler');

router.get(
  '/:negocioId',
  validatorHandler(queryCompraSchema, 'query'),
  validatorHandler(getnegocioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { negocioId } = req.params;
      const ventas = await service.find(negocioId, req.query);
      res.json(ventas);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:negocioId/:ventaId',
  validatorHandler(getventaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { negocioId, ventaId } = req.params;
      const venta = await service.findOne(negocioId, ventaId);
      res.json(venta);
    } catch (err) {

      next(err);
    }
  }
);
router.post(
  '/',
  validatorHandler(createventaSchema, 'body'),
  async (req, res,next) => {
    try{
      const body = req.body;
      const data = await service.create(body);
      res.json({
        message: 'created',
        data: data,
      });
    }catch(err){next(err)}
  }
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res,next) => {
   try{
    const body = req.body;
    const dat = await service.addItem(body);
    res.json({
      message: 'created item',
      data: dat,
    });
   }catch(err){next(err);}
  }
);
router.post(
  '/add-cobro',
  validatorHandler(addCobroSchema, 'body'),
  async (req, res,next) => {
    try{
      const body = req.body;
    const dat = await service.addCobro(body);
    res.json({
      message: 'created cobro',
      data: dat,
    });
    }catch(err){next(err);}
  }
);
router.post(
  '/add-cobroPendiente',
  validatorHandler(addCobroPendienteSchema, 'body'),
  async (req, res,next) => {
    try{const body = req.body;
      const dat = await service.addCobroPendiente(body);
      res.json({
        message: 'created CobroPendiente',
        data: dat,
      });}catch(err){next(err);}
  }
);


router.delete(
  '/sub-item/:negocioId/:ventaId/:productoId',
  validatorHandler(subItemSchema, 'params'),
  async (req, res,next) => {
    try{
      const xdel = await service.subItem(req.params);
      res.json({
        message: 'deleted item',
        data: xdel,
      });
    }catch(err){next(err);}
  }
);
router.delete(
  '/sub-cobro/:negocioId/:ventaId/:cobroId',
  validatorHandler(subCobroSchema, 'params'),
  async (req, res,next) => {
    try{
      const xdel = await service.subCobro(req.params);
      res.json({
        message: 'deleted cobro',
        data: xdel,
      });
    }catch(err){next(err);}
  }
);
router.delete(
  '/sub-cobroPendiente/:negocioId/:ventaId/:cobroPendienteId',
  validatorHandler(subCobroPendienteSchema, 'params'),
  async (req, res,next) => {
   try{
    const xdel = await service.subCobroPendiente(req.params);
    res.json({
      message: 'deleted cobro pendinte',
      data: xdel,
    });
   }catch(err){next(err);}
  }
);


router.patch(
  '/:negocioId/:ventaId',
  validatorHandler(getventaSchema, 'params'),
  validatorHandler(updateventaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { negocioId, ventaId } = req.params;
      const body = req.body;
      const xupdate = await service.update(negocioId, ventaId, body);
      res.json({
        message: 'updated',
        data: xupdate,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:negocioId/:ventaId',
  validatorHandler(getventaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { negocioId, ventaId } = req.params;
      const delX = await service.delete(negocioId, ventaId);
      res.json({
        message: 'deleted',
        data: delX,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
