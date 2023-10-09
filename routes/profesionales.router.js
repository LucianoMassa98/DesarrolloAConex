const express=require('express');
const router=express.Router();
const ProfesionalesService = require('../services/profesionales.service');
const service = new ProfesionalesService();
const  {
  createprofesionalSchema,
  getprofesionalSchema,
  queryprofesionalSchema
  } = require('../schemas/profesional.schema');

  const {getclinicaSchema} = require('../schemas/clinica.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:clinicaId',
validatorHandler(getclinicaSchema,'params'),
async (req,res,next)=>{
  try{
    const {clinicaId} = req.params;
    const profesionals=await service.find(clinicaId);
    res.json(profesionals);
  }catch(err){
    next(err);
  }
});
router.get('/:clinicaId/:profesionalId',
validatorHandler(getprofesionalSchema, 'params'),
validatorHandler(queryprofesionalSchema, 'query'),
async (req,res,next)=>{
  try{
    const{clinicaId,profesionalId}=req.params;
    const query = req.query;
  const profesional = await service.findOne(clinicaId,profesionalId,query);
  res.json(profesional);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createprofesionalSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newprofesional = await service.create(body);
    res.json({
      message: 'created',
      data: Newprofesional
    });
  }catch(err){next(err);}
});


router.delete('/:clinicaId/:profesionalId',
  validatorHandler(getprofesionalSchema,'params'),
  async(req, res,next) => {
  try{
    const { clinicaId,profesionalId } = req.params;
  const delX = await service.delete(clinicaId,profesionalId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
