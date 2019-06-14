const ldap = require('ldapjs')

module.exports = function(app){
        
        // Conection with LDAP witout proofs
        app.post('/auth',(req,res)=>{
            //check your connection
            ldapObj.open(function(err) {
            if (err) {
                throw new Error('Connection problem occured!');
            }
            console.log("Connected to ldap");

        });

        //Search
        search_options = {
            base: '',
            scope: '',
            filter: '',
            attrs: ''
        }
        ldapObj.search(search_options, function(err, data){
            if (err) {
                throw new Error('Search filed');
            }else {
                console.log("Search result:" + JSON.stringify(data))
            }
        });
    });

    app.post('/ldap', (req, res)=>{
        var result = "";    // To send back to the client
	
	    var client = ldap.createClient({
  		    url: req.body.serverUrl
        });
        
        client.bind(req.body.readerDN, req.body.readerPwd, function(err) {
            if (err) {
                result += "Reader bind failed " + err;
                res.send(result);
                return;
            }
            
            result += "Reader bind succeeded\n";
            
            var filter = `(uid=${req.body.username})`;
            
            result += `LDAP filter: ${filter}\n`;
            
            client.search(req.body.suffix, {filter:filter, scope:"sub"},
                (err, searchRes) => {
                    var searchList = [];
                    
                    if (err) {
                        result += "Search failed " + err;
                        res.send(result);
                        return;
                    }
                    
                    searchRes.on("searchEntry", (entry) => {
                        result += "Found entry: " + entry + "\n";
                        searchList.push(entry);
                    });
    
                    searchRes.on("error", (err) => {
                        result += "Search failed with " + err;
                        res.send(result);
                    });
                    
                    searchRes.on("end", (retVal) => {
                        result += "Search results length: " + searchList.length + "\n";
                        for(var i=0; i<searchList.length; i++) 
                            result += "DN:" + searchList[i].objectName + "\n";
                        result += "Search retval:" + retVal + "\n";					
                        
                        if (searchList.length === 1) {					
                            client.bind(searchList[0].objectName, req.body.password, function(err) {
                                if (err) 
                                    result += "Bind with real credential error: " + err;
                                else
                                    result += "Bind with real credential is a success";
                                    
                                res.send(result);	
                            });  // client.bind (real credential)
                            
                            
                        } else { // if (searchList.length === 1)
                            result += "No unique user to bind";
                            res.send(result);
                        }
    
                    });   // searchRes.on("end",...)
                    
            });   // client.search
            
        }); // client.bind  (reader account)
    });


    app.post("/ad", (req, res) => {
        var client = ldap.createClient({
            url: req.body.serverUrl
        });
        
        client.bind(req.body.username + '@' + req.body.domain, req.body.password, function(err) {
            if (err) {
                res.send("Bind failed " + err);
                return;
            }
            
            res.send("Log on successful");		
    
        }); // client.bind
        
    }); // app.post("/ad...")

}