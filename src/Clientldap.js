/*
var ldap = require('ldapjs');

let client = ldap.createClient({
    url: 'ldap://127.0.0.1:1389'
});

client.bind('cn=root', 'secret', function(err) {
    assert.ifError(err);
});

var opts = {
    filter: '(&(l=Seattle)(email=*@foo.com))',
    scope: 'sub',
    attributes: ['dn', 'sn', 'cn']
};
  
client.search('o=example', opts, function(err, res) {
    assert.ifError(err);
  
    res.on('searchEntry', function(entry) {
      console.log('entry: ' + JSON.stringify(entry.object));
    });
    res.on('searchReference', function(referral) {
      console.log('referral: ' + referral.uris.join());
    });
    res.on('error', function(err) {
      console.error('error: ' + err.message);
    });
    res.on('end', function(result) {
      console.log('status: ' + result.status);
    });
});

module.exports = client;
*/