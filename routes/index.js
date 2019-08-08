var express = require('express');
var router = express.Router();
var fs = require('fs');
var admin = require("firebase");

var serviceAccount = require("../creds.json");
// console.log(serviceAccount);

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCyRr7A79a4YkfkQcrOqJSFoZt2A1cy2ak",
	authDomain: "sportsdaylist.firebaseapp.com",
	databaseURL: "https://sportsdaylist.firebaseio.com",
	projectId: "sportsdaylist",
	storageBucket: "sportsdaylist.appspot.com",
	messagingSenderId: "947247987003"
};
admin.initializeApp(config);

var db = admin.database();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Sports for Indendence Day at KLH' });
});

router.post('/', function (req, res) {
	// Read form data to an object
	var text = req.body;
	var body = {
		name: text.name,
		branch:text.branch,
		year:text.year,
		gender: text.gender,
		carroms:text.carroms,
		chess:text.chess,
		tablet:text.tablet,
	};

	db.ref('entries').push(body, function (err) {
		if (err) throw err;

		console.log("Ok");
	});

	// Respond to the user
	res.send(" FORM SUBMITTED! ");
});

router.get('/list', function (req, res) {
	store.collection("entries").get().then(function (snapshot) {
		res.render('list', { sheet: snapshot });
	});
});

module.exports = router;
