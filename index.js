/**
 * Environment
 */
import env from './app/config/env'

/**
 * Database Connection
*/
import db from './app/imports/DB.js';

/**
 * Libraries
*/
import express from 'express';
const app = express();
import fileupload from 'express-fileupload';
import Passport from './app/middlewares/Passport';
import bodyParser from "body-parser";
import authmiddle from './app/middlewares/Authentication.js';

/**
 * Express Configuration
*/
//Protect folder storage only for authenticated users
app.use('/storage', authmiddle.checkTokenByStorageFiles);
//Protect folder user for id
app.use('/storage/profile/:id/*', authmiddle.checkUserFolder);

app.use('/storage',express.static('./storage')); //Public folder
app.use('/public',express.static('./public')); //Public folder
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //For api-rest
app.use(fileupload(
  {
    // useTempFiles : true,
    // tempFileDir : './storage/temp'
  }
)); //Package for upload files

/**
 * Exporting variables for use with routes
*/
module.exports.express = express;
module.exports.app = app;

/**
 * Models
*/
require('./app/models/User.js');
require('./app/models/Adventure.js');
require('./app/models/Stop.js');
require('./app/models/BankAccount.js');
require('./app/models/Card.js');
require('./app/models/StopImage.js');
require('./app/models/Recommendation.js');
require('./app/models/Caution.js');
require('./app/models/TypeTransport.js');
require('./app/models/Tag.js');
require('./app/models/AdventureTag.js');
require('./app/models/BuyAdventure.js');
require('./app/models/AdventureQualify.js');

/**
 * Start Server
 */
async function startServer(){
  try{
    require('./app/models/Relationships.js');
    await db.sync();
    
    var routerWeb = require('./app/routes/routes.js').router;
    app.use('/', routerWeb);

    //Start only on the first time deploying or when user admin was delete
    // await require('./config/StartData.js');

    app.listen(process.env.PORT, function () {
      console.log(`App listening on port ${process.env.PORT}!`);
    })

  }
  catch(err){
    console.error(err);
  }
}

/**
 * Main Method
 */
startServer();
