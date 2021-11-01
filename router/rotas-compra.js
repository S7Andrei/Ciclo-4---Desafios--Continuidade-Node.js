const express=require('express')
const models=require('../models')
const {Sequelize}=require('../models')
const router=express.Router()

let compra=models.Compra
let cliente=models.Cliente

router.post('/cliente/:id/compra',async(req,res)=>{
    
    const cp={
        data:req.body.data,
        ClienteId:req.params.id
    }

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'cliente não existe'
        })
    }

  await compra.create(cp).then((dados)=>{
      return res.status(200).json({
          error:false,
          message:'Compra efeituada com sucesso!',
          dados
      })
  }).catch((erro)=>{

    return res.status(400).json({
        error:true,
        message:'Não foi possível fazer sua compra.'
    })
})

})

router.get('/listarcompras',async(req,res)=>{
    await compra.findAll({
       order:[['data','ASC']]
    }).then((dados)=>{
       return res.status(200).json({
           error:false,
           dados
       })
   })
 })
 router.put('/cliente/:id/atualizarcompra',async(req,res)=>{
    const cp={
       data:req.body.data,
       ClienteId:req.params.id
    }
    
    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Compra não encotrada.'
        })
        
    }
      await compra.update(cp,{
          where:Sequelize.and({ClienteId:req.params.id},{id:req.body.id})
      }).then(()=>{
          return res.json({
              error:false,
              message:'Compra atualizada com sucesso !'
          })
      }).catch((erro)=>{
          return res.status(400).json({
              error:true,
              message:'Não foi possível atualizar compra'
          })
      })
   
   })

   router.get('/cliente/:id/excluircompra',async(req,res)=>{
    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Cliente não existe.'
        })
    }

    await compra.destroy({
        where:Sequelize.and({ClienteId:req.params.id},{id:req.body.id})
    }).then(()=>{
        return res.json({
            error:false,
            message:'Compra foi excluida com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possível excluir sua compra.'
        })
    })

})

module.exports=router
