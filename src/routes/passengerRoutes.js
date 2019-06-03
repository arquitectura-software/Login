const Passenger = require('../models/passenger');
module.exports = function(app){
    app.get('/passengers',(req,res)=>{
        Passenger.getpassengers((err, data)=>{
            res.status(200).json(data);
        });
    });
    app.post('/passengers',(req,res)=>{
        const passengerData = {
            id: null,
            id_user: req.body.id_user,
            birthdate: req.body.birthdate,
            email: req.body.email,
            phone: req.body.phone,
            created_at: new Date(),
            updated_at:new Date()
        };
        Passenger.insertpassenger (passengerData,(err,data)=>{
            if (data && data.insertId){
                res.json({
                    success: true,
                    data: data
                })
            }else{
                res.status(500).json({
                    success: false,
                    data: 'Error'
                })
            }
        })
    });

    app.put('/passengers/:id',(req,res)=>{
        const passengerData = {
            id: parseInt(req.params.id),
            id_user: req.body.id_user,
            birthdate: req.body.birthdate,
            email: req.body.email,
            phone: req.body.phone,
            created_at: new Date(),
            updated_at: new Date()
        };
        console.log(passengerData)
        Passenger.updatepassenger(passengerData,(err,data)=>{
            if (data && data.message){
                res.json(data)
            }else{
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });

    app.delete('/passengers/:id', (req, res) => {
        Passenger.deletepassenger(parseInt(req.params.id), (err, data) => {
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