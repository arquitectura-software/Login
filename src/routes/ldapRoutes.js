const ldap = require('ldapjs');

module.exports = function(app){

    app.post("/auth", (req, res) => {
        
        const username = 'cn='+req.body.username+',ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co';
        const password = req.body.password;
        
        var client = ldap.createClient({
            url: 'ldap://192.168.99.103:389',
            version: 3
        });
          
        var opts = {
            filter: '(objectclass=user)',
            scope: 'sub',
            attributes: ['objectGUID']
        };
        console.log("hallo before to search!")
        client.bind(username, password , function (err) {        
            if(err){
                
                res.status(404).json({
                    success: false,
                    data: 'Usuario no autenticado'
                })
                client.unbind(function(err) {if(err){console.log(err.message);} else{console.log('client disconnected');}});
            } else {
                res.status(200).json({
                    success: true,
                    data: 'Usuario autenticado'
                })
                client.search('ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co', opts, function (err, search) {
                    search.on('searchEntry', function(entry) {
                        if(entry.object){
                            console.log('entry: %j ' + JSON.stringify(entry.object));
                        }
                    });
                    search.on('error', function(error) {
                        console.error('error: ' + error.message);
                    });
                    client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
                });
            }
            
        });
        
    }); 
}