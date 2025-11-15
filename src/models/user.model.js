const { sequelize } = require("../config/database");
const { DataTypes } = require('sequelize');

const User= sequelize.define('user', 
{
    userId: 
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

    hoTen:
        {
            type: DataTypes.STRING(255),
            allowNull: false
        },

    email:
        {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },

    matKhau:
        {
            type: DataTypes.STRING(255),
            allowNull: false
        },

    mssv:
        {
            type: DataTypes.STRING(255),
            unique: true
        },

    vaiTro:
        {
            type: DataTypes.ENUM('STUDENT', 'ADMIN'),
            allowNull: false,
            defaultValue: 'STUDENT'
        },

    avatarUrl:
        {
            type: DataTypes.STRING(255),
            allowNull: true
        },
},

{
    tableName: 'user',
    timestamps: false
});

module.exports= User;
