const express=require('express');
const router=express.Router();
const InformesService = require('../services/informes.service');
const service = new InformesService();

const {getnegocioSchema} = require('../schemas/negocio.schema');

const {queryInformeSchema,getDetalleCapitalSchema}=require('../schemas/informe.schema');

const validatorHandler = require('../middlewares/validator.handler');

router.get('/reporte-ventas/:negocioId',
validatorHandler(queryInformeSchema,'query'),
  validatorHandler(getnegocioSchema,'params'),
  async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const informe=await service.reporteVentas(negocioId,req.query);
    res.json(informe);
  }catch(err){
    next(err);
  }
});

router.get('/detalle-capital/:negocioId/:capitalId',
  validatorHandler(getDetalleCapitalSchema,'params'),
  async (req,res,next)=>{
  try{
    const {negocioId, capitalId} = req.params;

    const informe=await service.detalleCapital(negocioId,capitalId);
    res.json(informe);
  }catch(err){
    next(err);
  }
});

router.get('/evolucion-capital/:negocioId',
validatorHandler(queryInformeSchema,'query'),
  validatorHandler(getnegocioSchema,'params'),
  async (req,res,next)=>{
  try{
    const {negocioId} = req.params;

    const informe=await service.evolucionCapital(negocioId,req.query);
    res.json(informe);
  }catch(err){
    next(err);
  }
});


module.exports=router;
