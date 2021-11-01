const express=require('express')
const models=require('../models')
const {Sequelize}=require('../models')

const router=express.Router()

let compra=models.Compra
let itemcompra=models.ItemCompra

router.post('/compra/:id/itemcompra',async(req,res)=>{
    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Compra não existe.'
        })
    } 
    
    await itemcompra.create(
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

router.get('/listaritemcompra',async(req,res)=>{
    await itemcompra.findAll({
        order:[['CompraId','ASC']]
    }).then((dados)=>{
       return res.json({
           error:false,
           dados
       })
   })

})

router.put('/compra/:id/atualizaritemcompra',async(req,res)=>{

    const item={
        quantidade:req.body.quantidade,
        valor:req.body.valor
    }
    
    if(!await compra.findByPk(req.params.id)){

         return res.status(400).json({
             error:true,
             message:'Compra não foi encontrada'
         })
    }

    await itemcompra.update(item,{
        where:Sequelize.and({CompraId:req.params.id},{ProdutoId:req.body.ProdutoId})
    }).then((dados)=>{
        return res.json({
            error:false,
            message:'Item alterado com sucesso !',
           
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Item não foi alterado.'
        })
    })

})

router.get('/compra/:id/excluiritemcompra',async(req,res)=>{

    if(!await compra.findByPk(req.params.id)){

        return res.status(400).json({
            error:true,
            message:'Compra não foi encontrado'
        })
   }


 
    await itemcompra.destroy({
        where:Sequelize.and({CompraId:req.params.id},{ProdutoId:req.body.ProdutoId})
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