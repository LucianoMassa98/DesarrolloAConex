const express = require('express');
const router = express.Router();
const GastosService = require('../services/gastos.service');
const service = new GastosService();
const {
  creategastoSchema,
  updategastoSchema,
  getgastoSchema,
} = require('../schemas/gasto.schema');

const { getnegocioSchema } = require('../schemas/negocio.schema');

const validatorHandler = require('../middlewares/validator.handler');

router.get(
  '/:negocioId',
  validatorHandler(getnegocioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { negocioId } = req.params;
      const gastos = await service.find(negocioId);
      res.json(gastos);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  '/:negocioId/:gastoId',
  validatorHandler(getgastoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { negocioId, gastoId } = req.params;
      const gasto = await service.findOne(negocioId, gastoId);
      res.json(gasto);
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  '/',
  validatorHandler(creategastoSchema, 'body'),
  async (req, res,next) => {
    try{
      const body = req.body;
      const Newgasto = await service.create( body);
      res.json({
        message: 'created',
        data: Newgasto,
      });
    }catch(err){
      next(err);
    }
  }
);
router.patch(
  '/:negocioId/:gastoId',
  validatorHandler(getgastoSchema, 'params'),
  validatorHandler(updategastoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { negocioId, gastoId } = req.params;
      const body = req.body;
      const xupdate = await service.update(negocioId, gastoId, body);
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
  '/:negocioId/:gastoId',
  validatorHandler(getgastoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { negocioId, gastoId } = req.params;
      const delX = await service.delete(negocioId, gastoId);
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
