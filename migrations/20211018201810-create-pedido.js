'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      data: {
        type: Sequelize.DATEONLY
      },
      

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ClienteId:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:'clientes',
          key:'id'          
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  }
};