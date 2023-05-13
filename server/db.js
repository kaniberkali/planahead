const mysql = require("mysql2")
const config = require('./config.js');

const pool = mysql.createPool(config.db)
function p2a(sql, debug = false){
    if(debug) console.log(sql);
    return new Promise(function(resolve, reject){
        pool.query(sql, function(error, result){
            if(error) reject(error);
            else resolve(result);
        });
    });
}

function a2s_u(table, data, whereFieldName, whereFieldValue){
    const values = Object.entries(data).map(function([key, value]){
        return `${key} = ${typeof value === 'string' ? `'${value}'` : value}`;
    });
    return `UPDATE ${table} SET ${values.join(', ')} WHERE ${whereFieldName} = ${typeof whereFieldValue === 'string' ? `'${whereFieldValue}'` : whereFieldValue}`;
}

function a2s_i(table, data){
    const values = Object.values(data).map(value => typeof value === 'string' ? `'${value}'` : value);
    return `INSERT INTO ${table} (${Object.keys(data).join(', ')}) VALUES (${values.join(', ')})`;
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