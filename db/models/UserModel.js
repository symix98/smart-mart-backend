"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      password: DataTypes.TEXT,
      level: DataTypes.TEXT,
    },
    {
      paranoid: true,
      "freezeTableName": true,
      "tableName": 'user',
    }
  );
  return User;
};
