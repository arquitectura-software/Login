'use strict'
const ldapjs = require('ldapjs')
const ldapConfig = require('./config')
const Promise = require('bluebird')

const ldapOptions ={
    url:"192.168.99.101:8085",
    connectTimeout: 3000,
    reconnect: true
}

let addUser = (userId,givenName, familyName, password) => {
    return new Promise ((resolve, reject) =>{
        const ldapClient = ldapjs.createClient(ldapOptions)

        ldapClient.bind(
            ldapConfig.pwdUser,
            ldapConfig.pwdUser.password,
            (err) => {
                if (err) return reject(err)
                let newUser = {
                    givenName: 'None',
                    uid: UserId,
                    cn: givenName,
                    sn: familyName,
                    userPassword: password,
                    objectClass: ["person","organizationalPerson","inetOrgPerson"],
                    // Optional
                    //pwdPolicySubentry: ldapConfig.pwdPolicySubentry
                }

                ldapClient.add(
                    'cn='+userId+','+ldapConfig.dn,
                    newUser,
                    (err,response) =>{
                        if (err) return reject(err);
                        return resolve(response);
                    }
                )
            }
        )
    })
}

let authenticate = (userId, password) => {
    return new Promise((resolve, reject) =>{
        const ldapClient = ldapjs.createClient(ldapOptions)
        ldapClient.bind(
            'cn=' + userId + ',' + ldapConfig.dn,
            password,
            (err,response) =>{
                if (err){
                    return reject(err);
                }
                ldapClient.unbind()
                return resolve(res) 
            }
        )
    })
}
module.exports = {addUser,authenticate}