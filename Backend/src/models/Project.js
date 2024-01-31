const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection'); // Importe a configuração do Sequelize

const Project = sequelize.define('project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverphoto: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  fk_iduser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Project.associate = (models) => {
  Project.belongsTo(models.User, {
    foreignKey: 'fk_iduser',
    onDelete: 'CASCADE',
  });
};

module.exports = Project;