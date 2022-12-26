
function NewCodProd(array){

  return  `${array.length +1}`;
}
/*
function (req,res, next){
  if(something){
    res.send('end');
  }else{
    next();
  }
}

function (error,req,res, next){
  if(error){
    res.status(500).json({error});
  }else{
    next();
  }
}
*/
module.exports = {NewCodProd};



