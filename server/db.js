const mysql = require("mysql2")
const config = require('./config.js');

const pool = mysql.createPool(config.db)
const p2a = async function (query, debug = false) {
    if (debug)
        console.log(query)
    return new Promise((resolve, reject) => {
        pool.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

const a2s_i = function (table, data) {
    let result = `INSERT INTO ${table} SET`;
    Object.keys(data).forEach(function(key) {
        result += " `" + key + "` = ";
        if (typeof data[key] === 'number') {
            result += data[key] + ",";
        } else {
            result += "'" + data[key] + "',";
        }
    });
    return result.slice(0, -1);
};


const a2s_u = function(table, data, id_field, id_value)
{
    let result = `UPDATE ${table} SET`
    Object.keys(data).forEach(function(key) {
        result += " `" + key + "` = '" + data[key] + "',"
    })
    return result.slice(0, -1) + ` WHERE ${id_field}=${id_value}`
}

//Kullanıcılar tablosu yoksa oluşturuyor.
p2a(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) DEFAULT NULL,
    surname VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    photo VARCHAR(255) DEFAULT NULL 
);`)

//Notlar tablosu yoksa oluşturuyor.
p2a(`CREATE TABLE IF NOT EXISTS notes (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL DEFAULT 0,
type VARCHAR(255) DEFAULT NULL,
icon_id INT NOT NULL DEFAULT 0,
date VARCHAR(255) DEFAULT NULL,
title VARCHAR(255) DEFAULT NULL,
content VARCHAR(500) DEFAULT NULL,
create_date VARCHAR(255) DEFAULT NULL,
state VARCHAR(255) DEFAULT NULL
);`)

module.exports = { p2a, a2s_i, a2s_u }