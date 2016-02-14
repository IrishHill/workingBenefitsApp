/**
 * This is the place where we read data out of QuickBooks
 * and move it to QuickBase
 * @type {*|exports|module.exports}
 */
var express         = require('express');
var QuickBooks      = require('../quickbooks_index');
var PropertyReader  = require('properties-reader');
var properties      = PropertyReader("./properties");
var qboauth_module  = require ('../helpers/qbo_setup');
var maptoqbase      = require ('../helpers/maptoqbase');
var jsonfile        = require('jsonfile');

var router = express.Router();

var app                   = require('../app');

router.get('/', function(req, res, next) {
    console.log("Welcome !");

});

router.get('/employees', function(req,res) {
    var file = '../public/employee.json'
    jsonfile.readFile(file, function(err, obj) {
        console.dir(obj);
        res.json(obj);
    });
});