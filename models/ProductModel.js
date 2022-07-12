"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: true,
      },
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      countinstock: DataTypes.INTEGER,
      imageurl: DataTypes.TEXT,
    },
    {
      paranoid: true,
      "freezeTableName": true,
      "tableName": 'product',
    }
  );
  return Product;
};
