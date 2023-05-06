const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');
const { User} = require('./db.js');
const getAllUsers = async () => {
    return await User.findAll()
}

const register = async (data) => {
    return await User.create({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password
    })
}

const login = async (data) => {
    return await User.findAll({
        where: {
            email: data.email,
            password: data.password
        }
    })
}
const validateRequestBody = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body);
            next();
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
};

module.exports = { register, login, validateRequestBody }