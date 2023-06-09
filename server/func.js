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

const editProfile = async (req) => {
    if (req.user !== undefined && req.user.login.id && req.file) {
        return (await p2a(`UPDATE users
                           SET photo='${req.file.filename}'
                           WHERE id = ${req.user.login.id}`))
    }
    else
        return false
}

const edit = async (req) => {
    if (req.user !== undefined && req.user.login.id)
    {
        const result = (await p2a(a2s_u("users", req.body, "id", req.user.login.id)))
        return result.affectedRows > 0
    }
    else
        return false
}

const addNote = async (req) => {
    if (req.user !== undefined && req.user.login.id)
    {
        req.body.user_id = req.user.login.id;
        req.body.icon_id = req.body.icon_id | 0;
        const result = (await p2a(a2s_i("notes", req.body)))
        return result !== undefined ? result : false
    }
    else
        return false
}

const getNotes = async (req) => {
    if (req.user !== undefined && req.user.login.id)
    {
        const result = (await p2a(`SELECT * FROM notes WHERE user_id='${req.user.login.id}'`))
        return result[0] !== undefined ? result : false
    }
    else
        return false
}

const getNote = async (req) => {
    if (req.user !== undefined && req.user.login.id)
    {
        const result = (await p2a(`SELECT * FROM notes WHERE user_id='${req.user.login.id}' AND id=${req.params.id}`))
        return result[0] !== undefined ? result[0] : false
    }
    else
        return false
}

const deleteNote = async (req) => {
    if (req.user !== undefined &&req.user.login.id)
    {
        const result = (await p2a(`DELETE FROM notes WHERE user_id='${req.user.login.id}' AND id=${req.params.id}`))
        return result.affectedRows > 0
    }
    else
        return false
}

const updateNote = async (req) => {
    if (req.user !== undefined &&req.user.login.id)
    {
        const result = (await p2a(a2s_u("notes", req.body, "id", req.params.id)))
        return result.affectedRows > 0
    }
    else
        return false
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

module.exports = { register, login, validateRequestBody, getUserByEmail, getNote, getNotes, addNote, deleteNote,editProfile, updateNote, edit }