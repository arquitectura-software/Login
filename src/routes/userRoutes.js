const User = require('../models/user');
module.exports = function (app) {
    app.get('/users', (req, res) => {
        User.getusers((err, data) => {
            res.status(200).json(data);
        });
    });
    app.post('/users', (req, res) => {
        const userData = {
            id: null,
            names: req.body.names,
            surnames: req.body.surnames,
            created_at: null,
            updated_at: null
        };
        console.log(userData);
        User.insertUser(userData, (err, data) => {
            if (data && data.insertId) {
                res.json({
                    success: true,
                    data: data
                })
            } else {
                res.status(500).json({
                    success: false,
                    data: 'Error'
                })
            }
        })
    });

    app.put('/users/:id', (req, res) => {
        const userData = {
            id: parseInt(req.params.id),
            names: req.body.names,
            surnames: req.body.surnames,
            created_at: null,
            updated_at: null
        };
        
        User.updateUser(userData, (err, data) => {
            if (data && data.message) {
                res.json(data)
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });
    
    app.delete('/users/:id', (req, res) => {
        User.deleteUser(parseInt(req.params.id), (err, data) => {
            if (data && data.message == 'deleted' || data.message == 'not exists') {
                res.json({
                    success: true,
                    data
                })
            }else{
                res.status(500).json({
                    message: "error"
                })
            }
        })
    });

}
