const express =require('express')
const cors =require('cors')
const models=require('./models')
const rotasCliente=require('./router/rotas-cliente')
const rotasPedido=require('./router/rotas-pedido')
const rotasServico=require('./router/rotas-servico')
const rotasItemPedido=require('./router/rotas-itempedido')
const rotasCompra=require('./router/rotas-compra')
const rotasProduto=require('./router/rotas-produto')
const rotasItemCompra=require('./router/rotas-itemcompra')
const app=express()
const {Sequelize} =require('./models')
app.use(cors())
app.use(express.json())



app.get('/',(req,res)=>{
     res.send('ola mundo')
})

app.use(rotasCliente)
app.use(rotasPedido)
app.use(rotasServico)
app.use(rotasItemPedido)
app.use(rotasCompra)
app.use(rotasProduto)
app.use(rotasItemCompra)




  
let port =process.env.PORT || 3001


app.listen(port,(req,res)=>{
    console.log(`Servido Ativo:http:localhost:${port}`)
})