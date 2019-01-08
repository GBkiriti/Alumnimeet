var express = require('express');
var router = express.Router();
var fs = require('fs');
var admin = require("firebase-admin");


var store = admin.firestore();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'KLH_SPORTSDAY' });
});

router.post('/', function (req, res) {
	// Read form data to an object
	var text = req.body;
	var body = {
		name: text.name,
		branch: text.branch,
		sport: text.sport,
	};
	
	store.collection("entries").add(body).then(function(docRef) {
		if (docRef !== null) {
			console.log("Entered body to firestore");
		}
	});

	// Respond to the user
	res.send("submitted! ");
});

router.get('/list', function (req, res) {
	store.collection("entries").get().then(function(snapshot) {
		res.render('list', { sheet: snapshot });
	});
});

module.exports = router;
