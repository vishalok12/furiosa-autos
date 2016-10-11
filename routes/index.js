var express = require('express');
var router = express.Router();
var api = require('../lib/api');
var modelRoute = require('./model');
var reviewsRoute = require('./reviews');
var servicesRoute = require('./services');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*
* Task 1:
* Make models alphabetically sortable (ascending, descending, default)
*/
router.get('/models', function(req, res, next) {
  // use api to get models and render output
  return modelRoute.handle(req, res, next);
});

/*
* Task 2:
* Make services filterable by type (repair, maintenance, cosmetic)
*/
router.get('/services', function(req, res, next) {
  // use api to get services and render output
  return servicesRoute.handle(req, res, next);
});

/*
* Task 3:
* Bugfix: Something prevents reviews from being rendered
* Make reviews searchable (content and source)
*/
router.get('/reviews', function(req, res, next) {
  return reviewsRoute.handle(req, res, next);
});

module.exports = router;
