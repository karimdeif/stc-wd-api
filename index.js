var express = require('express');
var app = express();
var fs = require("fs");

const DiscoveryV2 = require('ibm-watson/discovery/v2');
const { CloudPakForDataAuthenticator } = require('ibm-watson/auth');

app.get('/query', function (req, res) {

   let project_stc = 'f0db0abe-d796-4eed-8cb0-93c68c9f2e52';    
   let collection_ddos = 'f50dcb3d-e350-7fc6-0000-01737e03fa67';
   
   const discovery_manages_ddos = new DiscoveryV2({
            version: '2019-11-22',
            authenticator: new CloudPakForDataAuthenticator({
            username: 'admin',
            password: 'password',
            url: 'https://zen-cpd-zen.apps.cpd-wdemo.demo.ibmcloudpack.com:443',
     }),
     url: 'https://zen-cpd-zen.apps.cpd-wdemo.demo.ibmcloudpack.com:443/discovery/core/instances/f0db0abe-d796-4eed-8cb0-93c68c9f2e52/api',
   });

   /*
   const params = {
      projectId: project_stc,
      query: '{field}:{value}',
      collectionIds: collection_ddos
    };
   */

   const params = {
      projectId: project_stc,
      query: 'packages and prices',
      collectionIds: [collection_ddos]
    };

    discovery_manages_ddos.query(params)
    .then(response => {
      console.log(JSON.stringify(response.result, null, 2));
      res.end( response.result );
    })
    .catch(err => {
      console.log('error:', err);
    });

    /*
    discovery.query(params)
      .then(response => {
        console.log(JSON.stringify(response.result, null, 2));
      })
      .catch(err => {
        console.log('error:', err);
      });
 

    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
    */
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
