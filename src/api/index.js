var request = require('request');
var express = require('express');
var router = express.Router();

router.post('/api/comments', function (req, res, next) {
	request({
		url: 'http://api.woshuone.com/comments',
		method: 'POST',
		json: req.body
	}, function (error, response, body) {
		if (response.statusCode === 200 && !error) {
			res.send(response.body);
		} else {
			res.send('error');
		}
	})
})

router.post('/api/posts', function (req, res, next) {
	request({
		url: 'http://api.woshuone.com/posts',
		method: 'POST',
		json: req.body
	}, function (error, response, body) {
		if (response.statusCode === 200 && !error) {
			res.send(response.body);
		} else {
			res.status(400).send(response.body);
		}
	})
})

router.post('/api/addterms', function (req, res, next) {
	request({
		url: 'http://api.woshuone.com/addterms',
		method: 'POST',
		json: req.body
	}, function (error, response, body) {
		if (response.statusCode === 200 && !error) {
			res.send(response.body);
		} else {
			res.status(400).send(response.body);
		}
	})
})


module.exports = router;