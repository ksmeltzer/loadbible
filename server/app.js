var express = require("express");
var bodyParser = require('body-parser');

var mongoose = require('./shared/db.js').getConnection();

var passport = require('passport');
var authController = require('./users/authentication.js');

var app = express();

app.use(bodyParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

var gunService = require('./guns/gunService.js');
var userService = require('./users/userService.js');

console.log(gunService);


var router = express.Router();

router.route('/api/guns/config')
  .get(gunService.getConfig);

router.route('/api/users/user')
  .get(authController.isAuthenticated, userService.getUser)
  .post(userService.postUser)
    .put(authController.isAuthenticated, userService.putUser);

router.route('/api/users/currentuser/')
  .post(authController.isAuthenticated, userService.postUser);

router.route('/api/users/currentuser/authenticate/')
  .get(authController.isAuthenticated, userService.getAuthentication);



router.route('/api/users/currentuser/guns/')
  .get(authController.isAuthenticated, userService.getCurrentUserGuns)
  .post(authController.isAuthenticated, userService.postCurrentUserGuns);

router.route('/api/users/currentuser/guns/:id')
  .put(authController.isAuthenticated, userService.putCurrentUserGuns);

router.route('/api/bullets/bullet/')
    .post();
    
  router.route();



app.use('/', router);


app.listen(4242);
