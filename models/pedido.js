'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
  

    static associate(models) {
      
      Pedido.belongsTo(models.Cliente,{foreignKey:'ClienteId', as:'clientes'})
      Pedido.belongsToMany(models.Servico,{foreignKey:'ServicoId',
        through:'ItemPedido',as:'servicos_ped'
      })
      Pedido.hasMany(models.ItemPedido,{foreignKey:'PedidoId', as:'item_pedidos'})
    }
  };
  Pedido.init({
    data:DataTypes.DATEONLY,
    ClienteId:DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};