var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ProductSchema = require('./productsModel');
var getProducts = require('./getProducts');
var splitUrl = require('./urlSplitter.js');
var getOptions = require('./getOptions');
var mongoose = require('mongoose');
var SpendingLimitSchmea = require('./spendingLimitModel');
var getCurrentlySpent = require('./currentlySpentCalculator');
var getSpendingLimits = require("./getSpendingLimits.js");
var async = require('async');
var modifySpendingLimit = require('./modifySpendingLimit.js');
var _ = require('lodash');
var UserSchema = require('./models/userModel');
var tokenGenerator = require('./tokenGenerator.js');
var passport = require('passport');
var sendConfirmationMail = require('./mailer.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var modifyUser = require('./modifyUsers.js');
var async = require("async");
var deleteAllExpenses = require('./deleteAllExpenses.js');
var deleteAllSpendingLimits = require('./deleteAllSpendingLimits.js');
var deleteUser = require('./deleteUser.js');


mongoose.connect('mongodb://localhost/trackerdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	console.log('connected to DB');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use('/views', express.static('views'));
app.use('/directives', express.static('directives'));
app.use('/jquery-ui-1.11.4.custom', express.static('jquery-ui-1.11.4.custom'));

app.use(cookieParser());
app.use(session({
	secret: 'SECRET',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(flash());

app.get('/options', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res) {
	var requestParameters = {};
	requestParameters.userId = mongoose.Types.ObjectId(req.user._id);
	getOptions(requestParameters, function(products) {

		var uniqueProducts = [];
		products.forEach(function(product){
			if(!_.find(uniqueProducts, function(item) { return item.name === product.name;})) {
				uniqueProducts.push(product);
			}
		});
		res.end(JSON.stringify(uniqueProducts));
	});

});

app.get('/getSearchResults', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res) {
	var requestParameters = req.query;
	requestParameters.userId = mongoose.Types.ObjectId(req.user._id);
	getProducts(requestParameters, function(products) {
		res.end(JSON.stringify(products));
	});
});

app.get('/expense', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res){
	var requestParameters = splitUrl(req.url);
	console.log('request parameters: ', requestParameters)
	getProducts(requestParameters, function(products) {
		res.end(JSON.stringify(products));
	});
});

app.post('/expense', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res) {
	var receivedProd = new ProductSchema({
		name : JSON.parse(req.body.expense).name,
		quantity : JSON.parse(req.body.expense).quantity,
		unitPrice : JSON.parse(req.body.expense).unitPrice,
		totalPrice : JSON.parse(req.body.expense).totalPrice,
		category : JSON.parse(req.body.expense).category,
		userId : mongoose.Types.ObjectId(req.user._id)
	});
	receivedProd.save(function(err, receivedProd) {
		if(err) return console.error(err);
	});
	res.end(JSON.stringify(receivedProd));
});

app.post('/spendingLimit', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res){
	var receivedData = {
		product : req.body.spendingLimit.product,
		type : req.body.spendingLimit.type,
		limitValue : req.body.spendingLimit.limitValue,
		userId : mongoose.Types.ObjectId(req.user._id)
	};
	var requestParameters = {
		product: req.body.spendingLimit.product,
		userId: mongoose.Types.ObjectId(req.user._id)
	};
	getCurrentlySpent(requestParameters, function(sum) {
		if(sum[0] === undefined) {
			receivedData.currentlySpent = 0;
		}
		else {
			receivedData.currentlySpent = sum[0].sum;
		}
		var receivedSpendingLimit = new SpendingLimitSchmea(receivedData);
		console.log("currently spent:", receivedSpendingLimit);

		receivedSpendingLimit.save(function(err, receivedSpendingLimit) {
			if(err) {
				console.error(err);
				res.status(409).end(JSON.stringify(receivedData));
			}
			else {
				res.end(JSON.stringify(receivedSpendingLimit));
			}
		});
	});
});

app.get('/spendingLimit', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res){
	var requestParameters = req.query;
	requestParameters.userId = mongoose.Types.ObjectId(req.user._id);
	if(requestParameters._id != null) {
		requestParameters._id = mongoose.Types.ObjectId(requestParameters._id);
	}
	console.log(requestParameters);
	getSpendingLimits(requestParameters, function(spendingLimits) {
		// console.log("sl ", spendingLimits)
		res.end(JSON.stringify(spendingLimits));
	});
});

app.put('/spendingLimit', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res){
	var receivedData = {
		product : req.body.spendingLimit.product,
		type : req.body.spendingLimit.type,
		limitValue : req.body.spendingLimit.limitValue,
		currentlySpent : req.body.spendingLimit.currentlySpent,
		_id : req.body.spendingLimit._id,
		userId : mongoose.Types.ObjectId(req.user._id)
	};
	var receivedSpendingLimit = new SpendingLimitSchmea(receivedData);
	modifySpendingLimit(receivedSpendingLimit, function(err){
		if(err) {
			console.log(err)
			res.status(500).end("an error occurred");
		}
		else {
			console.log('done');
			res.end(JSON.stringify(receivedSpendingLimit))
		}
	})

});

app.post('/register', function(req,res){
	var receivedUser = {
		email : req.body.email,
		userName : req.body.userName,
		password : req.body.password
	}
	var newUser = new UserSchema(receivedUser);
	newUser.save(function(err, newUser){
		if(err) return console.error(err);
		else {
			console.log("new user: ", newUser);
			req.login(newUser, function(err) {
				if (err) {
					console.log(err);
				}
				return res.redirect('/');
			});
			sendConfirmationMail(receivedUser, "registration");
		}
	});
});

app.get('/user', function(req,res){
	res.end(JSON.stringify(req.user));
});

app.put('/user', function(req,res){
	var userUpdates = req.body;
	var user = req.user;
	for(var prop in user) {
		if(userUpdates.hasOwnProperty(prop)) {
			user[prop] = userUpdates[prop];
		}
	}
	modifyUser(user, function(newUser){
		if(userUpdates.hasOwnProperty('password')) {
			sendConfirmationMail(user, "changePassword");
		}
		else {
			sendConfirmationMail(user, "userUpdate");
		}
		res.end(JSON.stringify(user));
	})
});

app.delete('/users', function(req, res){
	var user = req.user;
	async.parallel([
		deleteAllExpenses(mongoose.Types.ObjectId(req.user._id)),
		deleteAllSpendingLimits(mongoose.Types.ObjectId(req.user._id)),
		deleteUser(mongoose.Types.ObjectId(req.user._id))
	], function() {
		res.end('done');
	});

})

passport.serializeUser(function (user, fn) {
	fn(null, user.id);
});

passport.deserializeUser(function(id, done) {
	UserSchema.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		UserSchema.findOne({ email: username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));

app.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/loginFailed',
		failureFlash: true
		}
	)

);

app.get('/logout', function(req,res){
	req.logout();
	res.status = 200;
	res.end("logged out");
})


app.get('/spendingLimitConfirmation', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res) {
	res.sendFile(__dirname + '/spendingLimitConfirmation.html');
});

app.get('/spendingLimitAdd', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res){
	res.sendFile(__dirname + '/spendingLimitAdd.html');
});

app.get('/spendingLimits', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res){
	res.sendFile(__dirname + '/spendingLimits.html');
});

app.get('/changeSpendingLimit', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res){
	res.sendFile(__dirname + '/changeSpendingLimit.html');
});

app.get('/', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res){
	console.log(req.user)
	res.sendFile(__dirname + '/index.html');
});

app.get('/search', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res){
	console.log(req.user);
	res.sendFile(__dirname + '/expenseSearch.html');
});

app.get('/searchResults', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res) {
	res.sendFile(__dirname + '/searchResults.html');
});

app.get('/confirmation', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res) {
	res.sendFile(__dirname + '/confirmation.html');
});

app.get('/expenseFilter.js', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res) {
	res.sendFile(__dirname + '/expenseFilter.js');
});

app.get('/dateGenerator.js', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res) {
	res.sendFile(__dirname + '/dateGenerator.js');
});

app.get('/myAccount', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res) {
	res.sendFile(__dirname + '/layouts/accountPage.html');
});

app.get('/myAccount/confirmation', require('connect-ensure-login').ensureLoggedIn('/login'), function(req,res) {
	res.sendFile(__dirname + '/layouts/accountChangeConfirmation.html');
});

app.get('/register', function(req,res){
	res.sendFile(__dirname + '/layouts/register.html');
});

app.get('/userConfirmation', function(req,res){
	res.sendFile(__dirname + '/layouts/userConfirmation.html');
});

app.get('/login', function(req,res){
	res.sendFile(__dirname + '/layouts/login.html');
});

http.listen(8080, function(){
	console.log("listening on port 8080");
});