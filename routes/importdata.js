/**
 * Created by sram on 7/9/15.
 */


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

var consumerKey    = properties.get('consumerKey'),
    consumerSecret = properties.get('consumerSecret');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.params.operation);

    res.render('index', {user: req.user});
});

router.get('/accounts', function(req,res,next) {
   //var qbo = req.session.qbo;
    //console.log ("in accounts++++ with qbo", qbo);

    var qboauth         = qboauth_module.qboAuth();

    console.log ("new QuickBooks Object", qboauth);

    qboauth.findAccounts(function (_, accounts) {
        req.session.accounts = accounts;


        //console.log(accounts);
        //accounts.QueryResponse.Account.forEach(function (account) {
        //    console.log(account.Name)
        //});
        res.json("qbodatadisplay", { accounts: accounts});
    });
});

router.get('/employee', function(req,res) {
    var file = '../public/employee.json'
    jsonfile.readFile(file, function(err, obj) {
        console.dir(obj);
        res.json(obj);
    });
});
////Route to pull customers
//router.get('/customers', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findCustomers( function (e, customers)
//        {
//            console.log(customers);
//            res.json(customers);
//    });
//});
//
////ruote to pull Attachables
//router.get('/attachables', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findAttachables( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Bills
//router.get('/bills', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findBills( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Bill Payments
//router.get('/billpayments', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findBillPayments( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Budgets
//router.get('/budgets', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findBudgets( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
//
////ruote to pull Classes
//router.get('/classes', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findClasses( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Company Info
//router.get('/companyinfo', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findCompanyInfos( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Credit Memos
//router.get('/creditmemos', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findCreditMemos( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Departments
//router.get('/departments', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findDepartments( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Employees
//router.get('/employees', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findEmployees( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull estimates
//router.get('/estimates', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findEstimates( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Invoices
//router.get('/invoices', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findInvoices( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Items
//router.get('/items', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findItems( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Payments
//router.get('/payments', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findPayments( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});
//
////ruote to pull Purchases
//router.get('/purchases', function(req,res,next) {
//    var qboauth         = qboauth_module.qboAuth();
//    console.log ("new QuickBooks Object", qboauth);
//    qboauth.findPurchases( function (e, customers)
//    {
//        console.log(customers);
//        res.json(customers);
//    });
//});






router.get('/qboauth', function(req,res,next) {
    var qboauth = qboauth_module.qboAuth();
    res.send(qboauth);
});



module.exports = router;
