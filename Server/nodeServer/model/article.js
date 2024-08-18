const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/newsDb');


const Article = sequelize.define('Article', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
      },
    Name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Anons: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
    }, 
  },
  {
    schema: 'newsDbScheme',
    tableName: 'Article',
    timestamps: false
  });
  
  module.exports = Article;