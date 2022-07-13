"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      pid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: true,
      },
      pdesc: DataTypes.TEXT,
      catid: DataTypes.INTEGER,
      pprice: DataTypes.INTEGER,
      imageurl: DataTypes.TEXT,
      pshow: DataTypes.TEXT,
    },
    {
      paranoid: true,
      "freezeTableName": true,
      "tableName": 'product',
    }
  );
  return Product;
};
