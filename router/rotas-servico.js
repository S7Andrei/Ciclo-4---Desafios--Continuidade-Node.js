const express=require('express')
const models=require('../models')

const router=express.Router()

let servico=models.Servico

router.post('/servicos',async(req,res)=>{

    await servico.create(
        req.body
        
    ).then(()=>{
      return  res.status(200).json({
            error:false,
            message:'serviço criado com sucesso!'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'impossível conectar!'
        })
    })
}) 

router.get('/listarservicos',async(req,res)=>{
    await servico.findAll({
          order:[['nome','ASC']]
    }).then((dados)=>{
        return res.status(200).json({
            error:false,
            dados
        })
    })
})

//ATUALIZAR SERVIÇO
router.put('/atualizarservico/:id',async(req,res)=>{
    const serv={
        nome:req.body.nome,
        descricao:req.body.descricao
    }

    if(!await servico.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Serviço não existe.'
        })
    }
   
    await servico.update(serv,{
        where:{id:req.params.id}
    }).then(()=>{
        return res.json({
            error:false,
            message:'Serviço atualizado com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possível atualizar serviço.'
        })
    })
})

router.get('/excluirservico/:id',async(req,res)=>{
    if(!await servico.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Serviço não existe.'
        })
    }

    await servico.destroy({
        where:{id:req.params.id}
    }).then(()=>{
        return res.json({
            error:false,
            message:'Serviço excluido com sucesso !'
        })
    }).catch((erro)=>{
        return res.status(400).json({
            error:true,
            message:'Não foi possível excluir o serviço.'
        })
    })
 })

 module.exports=router