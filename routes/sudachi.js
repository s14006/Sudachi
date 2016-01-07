var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var filename = __dirname + '/db.sqlite3';
var db = new sqlite3.Database(filename);

//Create(保留)
router.post('/sudachi/create', function(req, res) {
});

//Read
router.get('/sudachi/read', function(req, res) {
  res.send('auau');
});

//Update
router.post('/update', function(req, res) {
	console.log(req["body"]);
  //res.send('update');
});

//Delete(保留)
router.post('/sudachi/delete', function(req, res) {
  res.send('delete');
});

module.exports = router;
