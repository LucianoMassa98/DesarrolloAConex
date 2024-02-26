const express=require('express');
const router=express.Router();
const PacientesService = require('../services/pacientes.service');
const service = new PacientesService();
const  {
  createpacienteSchema,
  getpacienteSchema,
  } = require('../schemas/paciente.schema');

  const {getclinicaSchema} = require('../schemas/clinica.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:clinicaId',
validatorHandler(getclinicaSchema,'params'),
async (req,res,next)=>{
  try{
    const {clinicaId} = req.params;
    const pacientes=await service.find(clinicaId);
    res.json(pacientes);
  }catch(err){
    next(err);
  }
});
router.get('/',
validatorHandler(getpacienteSchema, 'query'),
async (req,res,next)=>{
  try{
  const paciente = await service.findOne(req.query);
  res.json(paciente);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createpacienteSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newpaciente = await service.create(body);
    res.json({
      message: 'created',
      data: Newpaciente
    });
  }catch(err){next(err);}
});


router.delete('/:clinicaId/:pacienteId',
  validatorHandler(getpacienteSchema,'params'),
  async(req, res,next) => {
  try{
    const { clinicaId,pacienteId } = req.params;
  const delX = await service.delete(clinicaId,pacienteId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
