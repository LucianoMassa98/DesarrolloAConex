const express=require('express');
const router=express.Router();
const productosService = require('../services/productos.service');
const {createproductoSchema,
  updateproductoSchema,
  getproductoSchema} = require('../schemas/producto.schema');
const {getnegocioSchema} = require('../schemas/negocio.schema');
const validatorHandler = require('../middlewares/validator.handler');
const service = new productosService();

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
router.get('/:negocioId/:productoId',
validatorHandler(getproductoSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,productoId}=req.params;
  const producto = await service.findOne(negocioId,productoId);
  res.json(producto);
  }catch(err){
    next(err);
  }
});
router.post('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
validatorHandler(createproductoSchema,'body'),
async (req, res) => {
  const {negocioId} = req.params;
  const body = req.body;
  const Newproducto = await service.create(negocioId,body);
  res.json({
    message: 'created',
    data: Newproducto
  });
});
router.patch('/:negocioId/:productoId',
validatorHandler(getproductoSchema,'params'),
validatorHandler(updateproductoSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,productoId } = req.params;
    const body = req.body;
    const prodUpdate = await service.update(negocioId,productoId,body);
    res.json(prodUpdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:productoId',
  validatorHandler(getproductoSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,productoId } = req.params;
  const delProd = await service.delete(negocioId,productoId);
  res.json(delProd);
  }catch(err){
    next(err);
  }
});

module.exports=router;