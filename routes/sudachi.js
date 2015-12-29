var express = require('express');
var router = express.Router();

//Create(保留)
router.post('/sudachi/create', function(req, res) {
});

//Read
router.get('/sudachi/read', function(req, res) {
  res.send('auau');
});

//Update
router.post('/sudachi/update', function(req, res) {
  res.send('update');
});

//Delete(保留)
router.post('/sudachi/delete', function(req, res) {
  res.send('delete');
});

module.exports = router;
