import index from '../../index';
import passport from 'passport';
import authmiddle from '../middlewares/Authentication.js';

var express = index.express;
var app = index.app;
var router = express.Router();

//Array of routes for permissions
let routes = [];

/**
 * Routes
 */


/**
 * All routes for /api/* are protected
 * Routes protected --------------------------------------------------------------------
 */

//Middlewares
app.use('/api/*', passport.authenticate('jwt', { session: false }));
app.use('/api/*', authmiddle.decodeToken);
app.use('/api/*', authmiddle.checkToken);

//Module Users
app.use('/api/users', require('./ProfileRoutes') );

/**
 * Routes and subroutes of Adventure ----------------------------
 */
//Adventure
app.use('/api/adventure', require('./AdventureRoutes') );

//TypeTransport
app.use('/api/adventure', require('./TypeTransportRoutes') );

//StopsRoutes
app.use('/api/adventure', require('./StopRoutes') );

//RecommendationRoutes
app.use('/api/adventure', require('./RecommendationRoutes') );

//StopPhoneRoutes
app.use('/api/adventure', require('./StopPhoneRoutes') );

//CautionRoutes
app.use('/api/adventure', require('./CautionRoutes') );

/**
 * --------------------------------------------------------------
 */

/**
 * Routes and subroutes of Tag
 */
app.use('/api/tag', require('./TagRoutes') );
/**
 * --------------------------------
 */

 /**
 * Routes and subroutes of BuyAdventure
 */
app.use('/api/buyadventure', require('./BuyAdventureRoutes') );
/**
 * --------------------------------
 */


//StopsRoutes
app.use('/api/bankaccount', require('./BankAccountRoutes') );
//StopsRoutes
app.use('/api/cards', require('./CardRoutes') );


/**
 * End Routes protected -----------------------------------------------------------------
*/

//Module SignUp, Remember Password
app.use('/', require('./RegisterRoutes') )

//Module Logín Authentication
app.use('/', require('./LoginRoutes') )

//Health Check
router.get('/health-check', (req, res) => { res.status(200).json({ok: JSON.parse(process.env.errors).health_check })} );

//Errors
router.get('/api/*', (req, res) => { res.status(404).json({"error": JSON.parse(process.env.errors).service_not_found }) });
router.post('/api/*', (req, res) => { res.status(404).json({"error": JSON.parse(process.env.errors).service_not_found }) });
router.get('/*', (req, res) => { res.status(404).json({"error": JSON.parse(process.env.errors).service_not_found }) });
router.post('/*', (req, res) => { res.status(404).json({"error": JSON.parse(process.env.errors).service_not_found }) });

module.exports.router = router;
module.exports.routes = routes;