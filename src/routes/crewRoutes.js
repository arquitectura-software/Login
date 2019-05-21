const crew = require('../models/crew');
module.exports = function(app){
    app.get('/crews',(req,res)=>{
        crew.getcrew((err, data)=>{
            res.status(200).json(data);
        });
    });
    app.post('/crews',(req,res)=>{
        const crewData = {
            id: null,
            id_user: req.body.id_user,
            dependence: req.body.dependence,
            created_at: null,
            updated_at:null
        };
        crew.insertCrew (crewData,(err,data)=>{
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

    app.put('/crews/:id',(req,res)=>{
        const crewData = {
            id: parseInt(req.params.id),
            id_user: req.body.id_user,
            dependence: req.body.dependence,
            created_at: null,
            updated_at:null
        };
        console.log(crewData)
        crew.updateCrew(crewData,(err,data)=>{
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

    app.delete('/crews/:id', (req, res) => {
        crew.deleteCrew(parseInt(req.params.id), (err, data) => {
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