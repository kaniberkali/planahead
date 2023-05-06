const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');

require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: 'mysql',
    pool: {
        max: parseInt(process.env.DB_MAX),
        min: parseInt(process.env.DB_MIN),
        acquire: parseInt(process.env.DB_ACQUIRE),
        idle: parseInt(process.env.DB_IDLE)
    }
})

const User = sequelize.define('user', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
})

sequelize.sync({ force: false })
module.exports = { User }