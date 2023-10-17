const express=require('express');
const router=express.Router();
const FeriadosService = require('../services/feriados.service');
const service = new FeriadosService();
const  {
  createferiadoSchema,
  updateferiadoSchema,
  getferiadoSchema,
  } = require('../schemas/feriado.schema');

  const {getclinicaSchema} = require('../schemas/clinica.schema');
  const validatorHandler = require('../middlewares/validator.handler');

  router.get('/:clinicaId',
  validatorHandler(getclinicaSchema,'params'),
  async (req, res,next) => {
    try{
      const {clinicaId} = req.params;
      const Newferiado = await service.find(clinicaId);
      res.json(Newferiado);
    }catch(err){next(err);}
  });

router.post('/',
validatorHandler(createferiadoSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newferiado = await service.create(body);
    res.json({
      message: 'created',
      data: Newferiado
    });
  }catch(err){next(err);}
});
router.patch('/:clinicaId/:feriadoId',
validatorHandler(getferiadoSchema,'params'),
validatorHandler(updateferiadoSchema,'body'),
async (req, res,next) => {
  try{
    const { clinicaId,feriadoId } = req.params;
    const body = req.body;
    const xupdate = await service.update(clinicaId,feriadoId,body);
    res.json({
      message: 'updated',
      data: xupdate
    });
  }
  catch(err){
    next(err);
  }
});

router.delete('/:clinicaId/:feriadoId',
  validatorHandler(getferiadoSchema,'params'),
  async(req, res,next) => {
  try{
    const { clinicaId,feriadoId } = req.params;
  const delX = await service.delete(clinicaId,feriadoId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});
router.get('/:clinicaId/:feriadoId',
validatorHandler(getferiadoSchema,'params'),
async (req, res,next) => {
  try{
    const { clinicaId,feriadoId } = req.params;
    const Newferiado = await service.findOne( clinicaId,feriadoId );
    res.json(Newferiado);
  }catch(err){next(err);}
});


module.exports=router;
