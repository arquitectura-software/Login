/*
const ldap = require('ldapjs');

let server = ldap.createServer();


serv.authorize2 = (req,callback) => {
    if (!req.connection.ldap.bindDN.equals('cn=root')){
        callback(null, {message: "success"});
        return next();
    }else{
        return next(new ldap.InsufficientAccessRightsError());
    }
};
function authorize(req, res, next) {
    if (!req.connection.ldap.bindDN.equals('cn=root'))
        return next(new ldap.InsufficientAccessRightsError());
  
    return next();
}

server.search('o=example', function(req, res, next) {
    var obj = {
        dn: 'o=example',
        attributes: {
            objectclass: ['top', 'organization'],
            o: ['example']
        }
    };
  
    if (req.filter.matches(obj))
        res.send(obj)
  
    res.end();
});

server.bind('ou=people, o=example', function(req, res, next) {
    console.log('bind DN: ' + req.dn.toString());
    console.log('bind PW: ' + req.credentials);
    res.end();
});


serv.search = (req,callback) => {
    var obj = {
        dn: 'o=example',
        attributes: {
            objectclass: ['top', 'organization'],
            o: ['example']
        }
    };
    if (req.filter.matches(obj)){
        callback(null,{obj})
    }else{
        callback(null,{message :"User not found"})    
    }
}


server.search('o=example', function(req, res, next) {
    var obj = {
        dn: 'o=example',
        attributes: {
            objectclass: ['top', 'organization'],
            o: ['example']
        }
    };
  
    if (req.filter.matches(obj))
      res.send(obj)
  
    res.end();
});
module.exports = {authorize,search,use,listen}


server.use(function(req, res, next) {
    console.log('hello world');
    return next();
});

//Listen a Server LDAP
server.listen(389, '127.0.0.1', () => {
    console.log('LDAP server listening at: ' + server.url);
});

module.exports = server;
*/


