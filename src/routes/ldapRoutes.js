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

    app.get("/ad", (req, res) => {
        var username = 'admin';
        //var password = 'admin';
        var password = 'loqueseamipex';
        //ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;
        var client = ldap.createClient({
            //url: 'ldap://192.168.99.103:8085/cn=admin,ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co'
            url: 'ldap://192.168.99.103:389'
            //url: 'ldap://192.168.99.103:389/cn='+username+', ou=users, ou=compton, dc=batman, dc=com'
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
            if(err){
                console.log(err.message);
                client.unbind(function(err) {if(err){console.log(err.message);} else{console.log('client disconnected');}});
            } else {
                console.log("hallo intra bind")
                //client.search('cn=hrumana@unal.edu.co,ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co', opts, function (err, search) {
                client.search('ou=academy,dc=arqsoft,dc=unal,dc=edu,dc=co', opts, function (err, search) {
                    console.log('Searching.....');
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