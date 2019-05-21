const mysql = require('mysql');
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Ident'
});

let UserModel = {};
UserModel.getusers = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM users ORDER BY id',
            (err, rows) => {
                if (err) {
                    throw err
                } else {
                    callback(null, rows)
                }
            }
        )
    }
}

UserModel.insertUser = (userData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO users SET ?', userData,
            (err, result) => {
                if (err) {
                    throw err
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )
    }
}

UserModel.updateUser = (userData, callback) => {
    if (connection) {
        const sql = `
        UPDATE users SET 
        names = ${connection.escape(userData.names)},
        surnames= ${connection.escape(userData.surnames)}
        WHERE id = ${connection.escape(userData.id)}`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err
            } else {
                callback(null, {
                    "message": "success"
                })
            }
        })
    };
}

UserModel.deleteUser = (id, callback) => {
    if (connection) {
        let sql = `
        SELECT * FROM users WHERE id = ${connection.escape(id)}`;
        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM users WHERE id = ${id}`;
                connection.query(sql, (err, result) => {
                    if (err) {
                        throw err
                    } else {
                        callback(null, {
                            "message": "deleted"
                        })
                    }
                })
            } else {
                callback(null, {
                    "message": "not exists"
                })
            }
        })
    }
}

module.exports = UserModel;