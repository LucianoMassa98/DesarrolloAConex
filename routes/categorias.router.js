const express=require('express');
const router=express.Router();
const {
  createcategoriaSchema,
  updatecategoriaSchema,
  getcategoriaSchema
  } = require('../schemas/categoria.schema');
const CategoriasService = require('../services/categorias.service');
const service = new CategoriasService();

const {getnegocioSchema}  = require('../schemas/negocio.schema');

const validatorHandler = require('../middlewares/validator.handler');


router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const products=await service.find(negocioId);
    res.json(products);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:categoriaId',
validatorHandler(getcategoriaSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,categoriaId}=req.params;
  const categoria = await service.findOne(negocioId,categoriaId);
  res.json(categoria);
  }catch(err){
    next(err);
  }
});

router.post('/',
validatorHandler(createcategoriaSchema,'body'),
async (req, res,next) => {
 try{ const body = req.body;
  const Newcategoria = await service.create(body);
  res.json({
    message: 'created',
    data: Newcategoria
  });}catch(err){next(err);}
});
router.patch('/:negocioId/:categoriaId',
validatorHandler(getcategoriaSchema,'params'),
validatorHandler(updatecategoriaSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,categoriaId } = req.params;
    const body = req.body;
    const prodUpdate = await service.update(negocioId,categoriaId,body);
    res.json({message: 'updated',data:prodUpdate});
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:categoriaId',
  validatorHandler(getcategoriaSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,categoriaId } = req.params;
  const delProd = await service.delete(negocioId,categoriaId);
  res.json({message:'deleted',data:delProd});
  }catch(err){
    next(err);
  }
});

module.exports=router;
