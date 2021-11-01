'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemCompra extends Model {

    static associate(models) {
      ItemCompra.belongsTo(models.Compra,{foreignKey:'CompraId',as:'compras'})
      ItemCompra.belongsTo(models.Produto,{foreignKey:'ProdutoId',as:'produtos'})
    }
  };
  ItemCompra.init({
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT,
    CompraId:DataTypes.INTEGER,
    ProdutoId:DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'ItemCompra',
  });
  return ItemCompra;
};