const express =require('express')
const models=require('../models')
const {Sequelize}=require('../models')
const router = express.Router()

let pedido=models.Pedido
let cliente=models.Cliente

router.post('/cliente/:id/pedido',async(req,res)=>{
    
    const ped={
        data:req.body.data,
        ClienteId:req.params.id
    }

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'cliente não existe'
        })
    }

  await pedido.create(ped).then((dados)=>{
      return res.json({
          error:false,
          message:'Pedido cadastrado com sucesso!',
          dados
      })
  }).catch((erro)=>{

    return res.status(400).json({
        error:true,
        message:'O Pedido não foi cadastrado.'
    })
})

})

router.get('/listarpedidos',async(req,res)=>{
    await pedido.findAll({
       order:[['data','ASC']]
    }).then((dados)=>{
       return res.status(200).json({
           error:false,
           dados
       })
   })
 })

 router.put('/cliente/:id/pedido',async(req,res)=>{
    const ped={
      data:req.body.data,
      ClienteId:req.params.id
    }

    if(!await cliente.findByPk(req.params.id)){
      return res.status(400).json({
          error:true,
          message:'cliente não existe'
      })
  }
  
  await pedido.update(ped,{
      where:Sequelize.and({ClienteId:req.params.id},{id:req.body.id})
  }).then((pedidos)=>{
      return res.json({
          error:false,
          message:'pedido atualizado com sucesso',
          pedidos
      })
  }).catch((erro)=>{
      return res.status(400).json({
          error:true,
          message:'Erro:não foi possível atualizar'
      })
  })
  

})

router.get('/cliente/:id/excluirpedido',async(req,res)=>{

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Pedido não existe.'
        })
    }

    await pedido.destroy({
        where:Sequelize.and({ClienteId:req.params.id},{id:req.body.id})
    }).then(()=>{
        return res.json({
            error:false,
            message:'Pedido foi excluido com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possível excluir o pedido.'
        })
    })
})

module.exports=router