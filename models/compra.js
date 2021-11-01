'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {

    static associate(models) {
      Compra.belongsTo(models.Cliente,{foreignKey:'ClienteId',as:'clientes'})
      Compra.belongsToMany(models.Produto,{foreignKey:'ProdutoId',
        through:'ItemCompra',as:'prod_compra'
      })
      Compra.hasMany(models.ItemCompra,{foreignKey:'CompraId',as:'item_compra'})
    }
  };
  Compra.init({
    data: DataTypes.DATEONLY,
    ClienteId:DataTypes.INTEGER
   
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};