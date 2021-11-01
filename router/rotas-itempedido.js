const express=require('express')
const models=require('../models')
const {Sequelize}=require('../models')

const router=express.Router()

let itempedido=models.ItemPedido
let pedido=models.Pedido

router.post('/pedido/:id/itempedido',async(req,res)=>{
     
       
    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Pedido não existe'
        })
    }
     
    await itempedido.create(
        req.body
    ).then(()=>{
        return res.status(200).json({
            error:false,
            message:'Item criado com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'O Item não foi criado.'
        })
    })

   })

   router.get('/listaritempedido',async(req,res)=>{
    await itempedido.findAll({
        order:[['PedidoId','ASC']]
    }).then(()=>{
       return res.json({
           error:false,
           
       })
   })

})

router.put('/pedido/:id/atualizaritem',async(req,res)=>{

    const item={
        quantidade:req.body.quantidade,
        valor:req.body.valor
    }
    
    if(!await pedido.findByPk(req.params.id)){

         return res.status(400).json({
             error:true,
             message:'Pedido não foi encontrado'
         })
    }

    await itempedido.update(item,{
        where:Sequelize.and({PedidoId:req.params.id},{ServicoId:req.body.ServicoId})
    }).then((dados)=>{
        return res.json({
            error:false,
            message:'Item alterado com sucesso !',
            dados
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Item não foi alterado.'
        })
    })

})

router.get('/pedido/:id/excluiritem',async(req,res)=>{

    if(!await pedido.findByPk(req.params.id)){

        return res.status(400).json({
            error:true,
            message:'Pedido não foi encontrado'
        })
   }

    await itempedido.destroy({
        where:Sequelize.and({PedidoId:req.params.id},{ServicoId:req.body.ServicoId})
    }).then(()=>{
        return res.json({
            error:false,
            message:'Item foi excluído com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possivel excluir item.'
        })
    })

})

module.exports=router