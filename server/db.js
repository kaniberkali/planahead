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
    let result = `INSERT INTO ${table} SET`
    Object.keys(data).forEach(function(key) {
        result += " `" + key + "` = '" + data[key] + "',"
    })
    return result.slice(0, -1)
}

const a2s_u = function(table, data, id_field, id_value)
{
    let result = `UPDATE ${table} SET`
    Object.keys(data).forEach(function(key) {
        result += " `" + key + "` = '" + data[key] + "',"
    })
    return result.slice(0, -1) + ` WHERE ${id_field}=${id_value}`
}

module.exports = { p2a, a2s_i, a2s_u }