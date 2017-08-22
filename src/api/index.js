var request = require('request');
var express = require('express');
var router = express.Router();
var fs = require('fs');

var uploadFolder = '../images';
var multer  = require('multer');
var imgDomain = 'http://img.woshuone.com/'

// 通过 filename 属性定制
var filepath = '';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        var name = file.originalname;
        filepath = getFileName(name)
        cb(null, filepath);
    }
});

function getFileName (fname, num = 0) {
	var index = fname.lastIndexOf('.'),
		name = fname.substr(0, index),
		suffix = fname.substr(index);
	try {
		if (num == 0) {
			var path = uploadFolder + "/" + fname;
		} else {
			var path = uploadFolder + "/" + name + '(' + num + ')' + suffix;
		}
		
		var stat = fs.statSync(path);
		if (stat) {
			return getFileName(fname, ++num);
		}
	}
	catch (err) {
		if (num == 0) {
			return fname;
		} else {
			return name + '(' + num + ')' + suffix;
		}	
	}
}

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

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

router.post('/api/upload', upload.single('imgFile'), function (req, res, next) {
	res.send(imgDomain + filepath);
})


module.exports = router;