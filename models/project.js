'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.User, {
        foreignKey: 'fk_iduser',
        onDelete: 'CASCADE',
      });
    }
  }
  Project.init({
    title: DataTypes.STRING,
    tags: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    coverphoto: DataTypes.STRING,
    fk_iduser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'project'
  });
  return Project;
};