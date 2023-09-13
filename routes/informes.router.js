const express=require('express');
const router=express.Router();
const InformesService = require('../services/informes.service');
const service = new InformesService();
const  { queryInformeSchema } = require('../schemas/informe.schema');
const {getnegocioSchema} = require('../schemas/negocio.schema');
const validatorHandler = require('../middlewares/validator.handler');

router.get('/reporte-ventas/:negocioId',
  validatorHandler(queryInformeSchema,'query'),
  validatorHandler(getnegocioSchema,'params'),
  async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const infrome=await service.find(negocioId,req.query);
    res.json(infrome);
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
    const infrome=await service.find(negocioId,req.query);
    res.json(infrome);
  }catch(err){
    next(err);
  }
});



module.exports=router;
