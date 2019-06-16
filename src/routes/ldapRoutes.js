const ldap = require('ldapjs');

//var ldap = require('ldap-client');
//var ldapObj = new ldap({ uri: 'ldap://http://192.168.99.103:8085/', version: 3});
/*const Promise = require('bluebird')
const ldapOptions = {                                                                                                                                                                        
    url: 'ldap://192.168.99.103:389',
    connectTimeout: 3000,
    reconnect: true
}*/


module.exports = function(app){

    // Authenticate
    /*app.post("/auth", (req, res) => {
        return new Promise((resolve, reject)=>{
            const ldapClient = ldap.createClient(ldapOptions)
            ldapClient.bind(
                //'cn='+req.userUid + ','+"ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co",
                //req.password,
                "cn=admin,dc=arqsoft,dc=unal,dc=edu,dc=co",
                "admin",
                (err,res)=>{
                    if(err){
                        return reject(err)
                    }
                    ldapClient.unbind()
                    return resolve(res)
                }
            )
        })
    }); */
    app.get("/ad", (req, res) => {
        var username = 'admin';
        var password = 'admin';
        //ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;
        var client = ldap.createClient({
            //url: 'ldap://192.168.99.103:8085/cn=admin,ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co'
            //url: 'ldap://192.168.99.103:389'
            url: 'ldap://192.168.99.103:389/cn='+username+', ou=users, ou=compton, dc=batman, dc=com'
        });
          
        var opts = {
            filter: '(objectclass=user)',
            scope: 'sub',
            attributes: ['objectGUID']
        };
        console.log("hallo before to search!")
        //client.bind('cn=admin,ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co', 'admin', function (err) {
        //client.bind('cn=hrumana@unal.edu.co,ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co', '123', function (err) {    
        client.bind(username, password , function (err) {        
            console.log("hallo intra bind")
            //client.search('cn=hrumana@unal.edu.co,ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co', opts, function (err, search) {
            client.search('ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co', opts, function (err, search) {
                console.log('Searching.....');
                search.on('searchEntry', function(entry) {
                    if(entry.object){
                        console.log('entry: %j ' + JSON.stringify(entry.object));
                    }else{
                        console.log("not entry object")
                    }
                });
                search.on('error', function(error) {
                    console.error('error: ' + error.message);
                });
                client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
            });
        });
        
    }); 
}