const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection'); // Importe a configuração do Sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perfilPhoto: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  country: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User;