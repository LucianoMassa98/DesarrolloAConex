const express=require('express');
const router=express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createclinicaSchema,
  updateclinicaSchema,
  getclinicaSchema}= require('../schemas/clinica.schema');

const ClinicasService = require('../services/clinicas.service');
const service = new ClinicasService();
router.get('/',
async (req,res,next)=>{
  try{
    const clinica=await service.find();
    res.json(clinica);
  }catch(err){
    next(err);
  }
});

router.get('/:clinicaId',
validatorHandler(getclinicaSchema,'params'),
async (req,res,next)=>{
  try{
    const {clinicaId} = req.params;
    const clinica=await service.findOne(clinicaId);
    res.json(clinica);
  }catch(err){
    next(err);
  }
});

router.post('/',
validatorHandler(createclinicaSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newclinica = await service.create(body);
    res.json({
      message: 'created',
      data: Newclinica
    });
  }catch(err){next(err);}
});

router.patch('/:clinicaId',
validatorHandler(getclinicaSchema,'params'),
validatorHandler(updateclinicaSchema,'body'),
async (req, res,next) => {
  try{
    const { clinicaId } = req.params;
    const body = req.body;
    const negUpdate = await service.update(clinicaId,body);
    res.json(negUpdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:clinicaId',
  validatorHandler(getclinicaSchema,'params'),
  async(req, res,next) => {
  try{
    const { clinicaId } = req.params;
  const delNeg = await service.delete(clinicaId);
  res.json(delNeg);
  }catch(err){
    next(err);
  }
});


module.exports=router;
