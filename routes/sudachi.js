var express = require('express');
var router = express.Router();

//Create
router.post('/sudachi/create', function(req, res, next) {
  res.send('create');
});

//Read
router.get('/sudachi/read', function(req, res, next) {
  res.send('auau');
});

//Update
router.post('/sudachi/update', function(req, res, next) {
  res.send('update');
});

//Delete
router.post('/sudachi/delete', function(req, res, next) {
  res.send('delete');
});

module.exports = router;
