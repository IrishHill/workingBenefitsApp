var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require ('express-session');
//var router        = require ('express-router');
var routes        = require('./routes/index');

var quickbooks    = require('./routes/quickbooks');
var intuit        = require('./routes/intuit');
var importdata    = require('./routes/importdata');
var quickbase     = require('./routes/quickbase_route');
var mongoose      = require('mongoose');
var passport      = require('passport');
var IntuitStrategy = require('passport-intuit').Strategy;
var cors           = require('cors');
var jsonfile        = require('jsonfile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Intuit profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


passport.use(new IntuitStrategy({
        returnURL: 'http://localhost:3000/intuit/return',
        realm: 'http://localhost:3000/',
        stateless: true
    },
    function(identifier, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Intuit profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Intuit account with a user record in your database,
            // and return that user instead.
            profile.identifier = identifier;
           // console.log ("+++++", profile);
            return done(null, profile);
        });
    }
));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'smith', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(cors());
//app.use(router());
//custom routes for the api


//empoyees
//app.get('/api/employees', function(req,res) {
//    var file = './public/employee.json'
//    jsonfile.readFile(file, function(err, obj) {
//        console.dir(obj);
//        res.json(obj);
//    });
//});

app.get('/api/accounts', function(req,res) {
    var file = './public/accounts.json'
    jsonfile.readFile(file, function(err, obj) {
        console.dir(obj);
        res.json(obj);
    });
});
app.get('/api/company', function(req,res) {
    var file = './public/accounts.json'
    jsonfile.readFile(file, function(err, obj) {
        console.dir(obj);
        res.json(obj);
    });
});
app.get('/api/employees', function(req,res) {

    res.json({
        "Employee": [
            {
                name: "John Wilson",
                title: "Jr Engineer",
                hired: "10/12/16",
                imgSrc: "1.jpg"
            },
            {
                name: "Sam Jackson",
                title: "Jr Engineer",
                hired: "10/12/16",
                imgSrc:"2.jpg"
            },
            {
                name: "Ryan Reynolds",
                title: "Jr Engineer",
                hired: "10/12/16",imgSrc:"3.jpg"
            },
            {
                name: "Luke Wilson",
                title: "Jr Engineer",
                hired: "10/12/16",imgSrc:"4.jpg"
            },
            {
                name: "Frank Manja",
                title: "Jr Engineer",
                hired: "10/12/16",
                imgSrc:"5.jpg"
            },
            {
                name: "Holy Capone",
                title: "Jr Engineer",
                hired: "10/12/16",
                imgSrc:"6.jpg"
            },
            {
                name: "Kye Holy",
                title: "Jr Engineer",
                hired: "10/12/16",
                imgSrc:"7.jpg"
            },
            {
                name: "Molly Capone",
                title: "Jr Engineer",
                hired: "10/12/16",
                imgSrc:"8.jpg"
            },
            {
                name: "Reynolds Capone",
                title: "Jr Engineer",
                hired: "10/12/16",
                imgSrc:"9.jpg"
            },{
                name: "Molly Engineer",
                title: "Jr Engineer",
                hired: "10/12/16",
                imgSrc:"10.jpg"
            }
        ]});

    app.get('/api/company', function(req,res) {

        res.json({
            name: "Google",
            location: " Mountain View",
            federalTax: "12312323132"
        })

        );
    //var file = './public/users.json'
    //jsonfile.readFile(file, function(err, obj) {
    //    console.dir(obj);
    //    res.json(obj);
    //});
});
app.use('/', routes); // default to index.js
app.use ('/quickbooks',quickbooks);
app.use ('/intuit', intuit);
app.use ('/importdata', importdata);
app.use ('/quickbase', quickbase);

app.get('/test',function(req,res){
    console.log("requestsdkvjbslbvsjhdbv");
   res.json({test:"hoola"});

});
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
    mongoose.connect('mongodb://localhost:27017/qbtest');
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
