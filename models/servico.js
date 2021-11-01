'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servico extends Model {
 
    static associate(models) {
     
      Servico.belongsToMany(models.Pedido,{ foreignKey:'PedidoId',  through:'ItemPedido', as:'pedidos_serv'})
      Servico.hasMany(models.ItemPedido,{foreignKey:'ServicoId',as:'item_servicos'})
    }
  };
  Servico.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Servico',
  });
  return Servico;
};