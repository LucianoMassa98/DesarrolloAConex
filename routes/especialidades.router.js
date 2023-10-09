const express=require('express');
const router=express.Router();
const EspecialidadesService = require('../services/especialidades.service');
const service = new EspecialidadesService();
const  {
  createespecialidadSchema,
  updateespecialidadSchema,
  getespecialidadSchema
  } = require('../schemas/especialidad.schema');

  const {getclinicaSchema} = require('../schemas/clinica.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:clinicaId',
validatorHandler(getclinicaSchema,'params'),
async (req,res,next)=>{
  try{
    const {clinicaId} = req.params;
    const especialidads=await service.find(clinicaId);
    res.json(especialidads);
  }catch(err){
    next(err);
  }
});
router.get('/:clinicaId/:especialidadId',
validatorHandler(getespecialidadSchema, 'params'),
async (req,res,next)=>{
  try{
    const{clinicaId,especialidadId}=req.params;
  const especialidad = await service.findOne(clinicaId,especialidadId);
  res.json(especialidad);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createespecialidadSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newespecialidad = await service.create(body);
    res.json({
      message: 'created',
      data: Newespecialidad
    });
  }catch(err){next(err);}
});
router.patch('/:clinicaId/:especialidadId',
validatorHandler(getespecialidadSchema,'params'),
validatorHandler(updateespecialidadSchema,'body'),
async (req, res,next) => {
  try{
    const { clinicaId,especialidadId } = req.params;
    const body = req.body;
    const xupdate = await service.update(clinicaId,especialidadId,body);
    res.json({
      message: 'updated',
      data: xupdate
    });
  }
  catch(err){
    next(err);
  }
});

router.delete('/:clinicaId/:especialidadId',
  validatorHandler(getespecialidadSchema,'params'),
  async(req, res,next) => {
  try{
    const { clinicaId,especialidadId } = req.params;
  const delX = await service.delete(clinicaId,especialidadId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
