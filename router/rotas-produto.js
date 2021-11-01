const express =require('express')
const models=require('../models')
const router = express.Router()
let produto=models.Produto

router.post('/produto',async(req,res)=>{
    await produto.create(
        req.body
    ).then(()=>{
        return res.json({
            error:false,
            message:'Produto cadastrado com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possivel cadastrar o produto.'
        })
    })
})

router.get('/listarprodutos',async(req,res)=>{
    await produto.findAll({
        order:[['nome','ASC']]
     }).then((dados)=>{
        return res.status(200).json({
            error:false,
            dados
        })
    })

  })

  router.put('/atualizarproduto/:id',async(req,res)=>{

    const prod={
        nome:req.body.nome,
        descricao:req.body.descricao
    }

    if(!await produto.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Produto não existe.'
        })
    }   
     
     await produto.update(prod,{
         where:{id:req.params.id}
     }).then(()=>{
         return res.json({
             error:false,
             message:'Produto atualizado com sucesso !'
         })
     }).catch((erro)=>{
         return res.status(400).json({
             error:true,
             message:'Não foi possível atualizar produto.'
         })
     })

  })

  router.get('/excluirproduto/:id',async(req,res)=>{
    if(!await produto.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Produto não existe.'
        })
    }  
    
     await produto.destroy(
         {where:{id:req.params.id}}
     ).then(()=>{
         return res.json({
             error:false,
             message:'Produto excluído com sucesso'
         })
     }).catch((erro)=>{
         return res.status(400).json({
             error:true,
             message:'Não foi possível excluir produto.'
         })
     })
   })

   module.exports=router
