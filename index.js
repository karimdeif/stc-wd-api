const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

//app.use(bodyParser.urlencoded({ extended: false  }));
//app.use(bodyParser.json());

var jsonParser = bodyParser.json();

const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { CloudPakForDataAuthenticator } = require('ibm-watson/auth');

app.post('/query', jsonParser, function (req, res) {

   console.log('test 21');

   let req_search_entity = req.body.search_entity;
   let req_search_query = req.body.search_query;
   
   console.log('body: ', req.body);
   console.log('search_entity: ', req_search_entity);
   console.log('search_query: ', req_search_query);
   
   //let collection_ddos      = 'f50dcb3d-e350-7fc6-0000-01737e03fa67';      
   //let collection_safelink  = 'f50dcb3d-e350-7fc6-0000-01737db75b7c' ;  
   //let collection_infomind  = 'f50dcb3d-e350-7fc6-0000-01737dd20e25';

   //let collection_ddos      = 'e9ef8ca7-154c-f424-0000-01739ee0e6dc';
   //let collection_safelink  = 'e9ef8ca7-154c-f424-0000-01739ee3414a' ;  
   //let collection_infomind  = 'e9ef8ca7-154c-f424-0000-01739ee1a54c';   

   //let collection_ddos      = 'f50dcb3d-e350-7fc6-0000-01737d9bb618';
   //let collection_safelink  = 'e9ef8ca7-154c-f424-0000-01739ee3414a' ;  
   //let collection_infomind  = 'f50dcb3d-e350-7fc6-0000-01737dd20e25';   

   let collection_ddos      = 'f50dcb3d-e350-7fc6-0000-01737e03fa67';
   let collection_safelink  = 'f50dcb3d-e350-7fc6-0000-01737dd2d5e5' ;  
   let collection_infomind  = 'f50dcb3d-e350-7fc6-0000-01737df208f7'; 
   //let collection_misc      = '5ebfcb23-5fa0-6692-0000-0173bee1a2a8'; 
   //let collection_qa      = '5ebfcb23-5fa0-6692-0000-0173d799db17'
   let collection_sec_pak   = '5ebfcb23-5fa0-6692-0000-0173c290fb1a'; 

   let selected_collection = '';

   if ((/ddos/i).test(req_search_entity)) {
    console.log('Found entity ddos');
    selected_collection = collection_ddos;

   } else if((/safe link/i).test(req_search_entity)) {
    console.log('Found entity Safe Link');
    selected_collection = collection_safelink;

   } else if ((/infomind/i).test(req_search_entity)) {
    console.log('Found entity InfoMind');
    selected_collection = collection_infomind;

   } else if ((/stcs misc/i).test(req_search_entity)) {
    console.log('Found entity Misc');
    selected_collection = collection_misc;
   }

   else if ((/security pak/i).test(req_search_entity)) {
    console.log('Found entity Security Pak');
    selected_collection = collection_sec_pak;
   }

   const discovery = new DiscoveryV1({
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
    collectionId: selected_collection,
    query: req_search_query,
  };

  console.log('going to WD with:');
  console.log(queryParams);
  
  let ret_subtitle = '';
  let ret_html_table = '';
  let ret_title = '';
  let ret_text = '';

  discovery.query(queryParams)
    .then(queryResponse => {
      console.log(JSON.stringify(queryResponse.result, null, 2));

      //res.setHeader('Content-Type', 'application/json');
      res.json(queryResponse.result)
      //res.end( JSON.stringify(queryResponse.result, null, 2) );    
    })
    .catch(err => {
      console.log('error:', err);
    });
})

console.log('Return from WD');

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
