const express = require('express');
const { pool } = require('./db.js');
const {p2a, a2s_i, a2s_u} = require("./db");

const register = async (data) => {
    return p2a(a2s_i(data))
}

const login = async (data) => {
    return (await p2a(`SELECT * FROM users WHERE email='${data.email}' AND password='${data.password}'`))
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