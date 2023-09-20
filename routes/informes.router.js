const express=require('express');
const router=express.Router();
const InformesService = require('../services/informes.service');
const service = new InformesService();

const {getnegocioSchema} = require('../schemas/negocio.schema');
const validatorHandler = require('../middlewares/validator.handler');

router.get('/reporte-ventas/:negocioId',
  validatorHandler(getnegocioSchema,'params'),
  async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const infrome=await service.reporteVentas(negocioId);
    res.json(infrome);
  }catch(err){
    next(err);
  }
});

router.get('/evolucion-capital/:negocioId',
  validatorHandler(getnegocioSchema,'params'),
  async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    console.log("-------->");
    const infrome=await service.evolucionCapital(negocioId);
    res.json(infrome);
  }catch(err){
    next(err);
  }
});



module.exports=router;
