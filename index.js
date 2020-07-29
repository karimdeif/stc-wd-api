const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());

const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { CloudPakForDataAuthenticator } = require('ibm-watson/auth');

app.post('/query', function (req, res) {

  console.log('body: ', req.body);
   console.log('query-param: ', req.body.queryparam);

   let project_stc = 'f0db0abe-d796-4eed-8cb0-93c68c9f2e52';    
   let collection_ddos = 'f50dcb3d-e350-7fc6-0000-01737e03fa67';
   
   const discovery_manages_ddos = new DiscoveryV1({
            version: '2019-11-11',
            authenticator: new CloudPakForDataAuthenticator({
            username: 'admin',
            password: 'password',
            url: 'https://zen-cpd-zen.apps.cpd-wdemo.demo.ibmcloudpack.com:443',
            disableSslVerification: true,                           
     }),
     url: 'https://zen-cpd-zen.apps.cpd-wdemo.demo.ibmcloudpack.com/discovery/core/instances/1589439404193/api',
     disableSslVerification: true,
   });

 const queryParams = {
   environmentId: 'default',
   collectionId: 'f50dcb3d-e350-7fc6-0000-01737e03fa67',
   query: 'packages and prices',
 };
 
 discovery_manages_ddos.query(queryParams)
  .then(queryResponse => {
    res.end( JSON.stringify(queryResponse.result, null, 2) );    
  })
  .catch(err => {
    console.log('error:', err);
  });
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
