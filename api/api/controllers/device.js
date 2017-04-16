'use strict';

var util = require('util');
var connection;

module.exports = {
	getStatus: getStatus,
	putStatus: putStatus,
	getValue: getValue,
	putValue: putValue,
	getInfo: getInfo
};

function getStatus(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	
	dbConnection();
	connection.query('SELECT * FROM device WHERE name="'+deviceName+'"', function (error, results, fields) {
		if (error) {
			res.status(400); //Error
			res.json({"message" : "Error on get device status value."});
		}
		var accessValues = results[0];
		res.json({"value" : accessValues['status']}); //Return the device status value in json format
	});
	connection.end();
}

function putStatus(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	var body = req.swagger.params.newValue.value || 'unknow';
	var newValue = body["newValue"];
	newValue = newValue[0]; //This contain the status value
	
	dbConnection();
	connection.query('UPDATE device SET status="'+newValue["value"]+'" WHERE name="'+deviceName+'"', function (error, results, fields) {
		if (error) {
			res.status(400); //Error
			res.json({"message" : "Error on update status device."});
		}
		var accessValues = results[0];
		res.json({"value" : newValue["value"]}); //Return the device status value in json format
	});
	connection.end();
}

function getValue(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	
	dbConnection();
	connection.query('SELECT * FROM device WHERE name="'+deviceName+'"', function (error, results, fields) {
		if (error) {
			res.status(400); //Error
			res.json({"message" : "Error on get device value."});
		}
		var accessValues = results[0];
		res.json({"value" : accessValues['value']}); //Return the device value in json format
	});
	connection.end();
}

function putValue(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	var body = req.swagger.params.newValue.value || 'unknow';
	var newValue = body["newValue"];
	newValue = newValue[0]; //This contain the value
	
	dbConnection();
	connection.query('UPDATE device SET value="'+newValue["value"]+'" WHERE name="'+deviceName+'"', function (error, results, fields) {
		if (error) {
			res.status(400); //Error
			res.json({"message" : "Error on update value device."});
		}
		var accessValues = results[0];
		res.json({"value" : newValue["value"]}); //Return the device status value in json format
	});
	connection.end();
}

function getInfo(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	
	dbConnection();
	connection.query('SELECT * FROM device WHERE name="'+deviceName+'"', function (error, results, fields) {
		if (error)
			res.status(400); //Error
		if(results.length > 0) {          
			res.json(results[0]); //Return all the device info in json format
		}
	});
	connection.end();
}

function dbConnection() {
	var mysql      = require('mysql');
	connection = mysql.createConnection({
	  host     : '127.0.0.1', //On MAC in localhost
	  //host	: '172.24.1.1',
	  user     : 'root',
	  password : 'root',
	  database : 'HouseIoT',
	  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' //On MAC localhost with MAMP
	});

	connection.connect();
}