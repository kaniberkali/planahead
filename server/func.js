const {p2a, a2s_i, a2s_u} = require("./db.js")

const getUserByEmail = async(email) => {
    const result = (await p2a(`SELECT * FROM users WHERE email='${email}'`))
    return result[0] !== undefined ? result[0] : false
}

const register = async (data) => {
    const result = (await p2a(a2s_i("users", data)))
    return result !== undefined ? result : false
}

const login = async (data) => {
    const result = (await p2a(`SELECT * FROM users WHERE email='${data.email}' AND password='${data.password}'`))
    return result[0] !== undefined ? result[0] : false
}

const addNote = async (data) => {
    const result = (await p2a(a2s_i("notes", data)))
    return result !== undefined ? result : false
}

const getNotes = async (data) => {
    const result = (await p2a(`SELECT * FROM notes WHERE user_id='${data.user_id}'`))
    return result[0] !== undefined ? result : false
}

const getNote = async (data) => {
    const result = (await p2a(`SELECT * FROM notes WHERE user_id='${data.user_id}' AND id=${data.id}`))
    return result[0] !== undefined ? result[0] : false
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

module.exports = { register, login, validateRequestBody, getUserByEmail, getNote, getNotes, addNote }