"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: true,
      },
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      role: DataTypes.TEXT,
    },
    {
      paranoid: true,
      "freezeTableName": true,
      "tableName": 'user',
    }
  );
  return User;
};
