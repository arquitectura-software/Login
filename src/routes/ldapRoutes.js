const ldap = require('ldapjs');

//var ldap = require('ldap-client');
//var ldapObj = new ldap({ uri: 'ldap://http://192.168.99.103:8085/', version: 3});
const Promise = require('bluebird')
const ldapOptions = {                                                                                                                                                                        
    url: 'ldap://192.168.99.103:8085',
    connectTimeout: 3000,
    reconnect: true
}


module.exports = function(app){

    // Authenticate
    app.post("/auth", (req, res) => {
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
    }); // app.post("/ad...")
}