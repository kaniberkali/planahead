require('dotenv').config()
module.exports = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit:  parseInt(process.env.DB_CONNECTION_LIMIT)
    },
    jwt_secret: "ttwbeshkYzaX"
}