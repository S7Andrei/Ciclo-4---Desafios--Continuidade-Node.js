const express=require('express')
const models=require('../models')
const router=express.Router()

let cliente=models.Cliente

router.post('/cliente',async(req,res)=>{
    await cliente.create(
     req.body
    ).then((dados)=>{
    return res.json({
     error:false,
     message:'Cliente cadastrado com sucesso!',
     dados
    })
 }).catch((erro)=>{
     return res.status(400).json({
         error:true,
         message:'Cliente não foi cadastrado.'
     })
    })
 })

 router.get('/clientes',async(req,res)=>{
    await cliente.findAll({include:[{all:true}]})
    .then((dados)=>{
        return res.json({
            error:false,
            dados
        })
    })
})

router.put('/atualizarcliente/:id',async(req,res)=>{
    
    
    const cli={
           nome:req.body.nome,
           endereco:req.body.endereco,
           cidade:req.body.cidade,
           uf:req.body.uf,
           nascimento:req.body.nascimento,
           clienteDesde:req.body.clienteDesde
       }
   
       if(!await cliente.findByPk(req.params.id)){
           return res.status(400).json({
               error:true,
               message:'cliente não existe'
           })
       }
   
       await cliente.update(cli,{
           where:{id:req.params.id}
           }
       ).then(()=>{
           return res.json({
               error:false,
               message:'Cliente atualizado com sucesso !',
              
           })
       }).catch((erro)=>{
           return res.status(400).json({
               error:true,
               message:'Não foi possível atualizar o cliente.'
           })
       })
   
   })

   router.get('/excluircliente/:id',async(req,res)=>{
    await cliente.destroy({
        where:{id:req.params.id}
    }).then(()=>{
        return res.json({
            error:false,
            message:'Cliente excluído com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possível excluir cliente.'
        })
    })
})


module.exports =router