var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var filename = __dirname + '/db.sqlite3';
var db = new sqlite3.Database(filename);

var sqlInsert = 'INSERT INTO items VALUES(?, ?, ?, ?);';
var sqlUpdate = 'UPDATE items SET sudachi = ? where id = ?;';
var sqlSelect = 'select * from items;';

//Create(保留)
/*
router.post('/create', function(req, res) {
	content = req.body;
	var s_id = content.id;
	var sudachi = content.contents;
	var createtime = content.createtime;
	var updatetime = content.updatetime;

	db.serialize(function() {
		db.run(sqlInsert, s_id, sudachi, createtime, updatetime);
	});

	db.each(sqlSelect, function(err, row) {
		if (!err) {
			console.log(row);
		};
	});

});
*/

//Read
router.get('/sudachi/read', function(req, res) {
  res.send('auau');
});

//Update
router.post('/update', function(req, res) {
	var content = req.body;
	console.log(content);
	var s_id = content.id;
	var sudachi = content.contents;
	var createtime = content.createtime;
	var updatetime = content.updatetime;

	db.serialize(function() {
		db.run(sqlUpdate, sudachi, s_id);
	});

	db.each(sqlSelect, function(err, row) {
		if (!err) {
			console.log(row);
		};
	});
});

//Delete(保留)
router.post('/sudachi/delete', function(req, res) {
  res.send('delete');
});

module.exports = router;
