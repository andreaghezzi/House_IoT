'use strict';

var util = require('util');
var app = require('../../app');
var connection;

module.exports = {
		getStatus: getStatus,
		getValue: getValue,
		getInfo: getInfo
};

function getStatus(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	
	dbConnection();
	connection.query('SELECT status FROM device WHERE name="'+deviceName+'"', function (error, results, fields) {
	  if (error)
		  throw error;
	  res.json(results[0]); //Return the device status in json format
	});
	connection.end();
}

function getValue(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	
	dbConnection();
	connection.query('SELECT value FROM device WHERE name="'+deviceName+'"', function (error, results, fields) {
	  if (error)
		  throw error;
	  res.json(results[0]); //Return the device value in json format
	});
	connection.end();
}

function getInfo(req, res) {
	var deviceName = req.swagger.params.deviceName.value || 'unknow';
	
	dbConnection();
	connection.query('SELECT * FROM device WHERE name="'+deviceName+'"', function (error, results, fields) {
	  if (error)
		  throw error;
	  if(results.length > 0) {          
        res.json(results[0]); //Return the device info in json format
      }
	});
	connection.end();
}

function dbConnection() {
	var mysql      = require('mysql');
	connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  password : 'root',
	  database : 'HouseIoT',
	  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
	});

	connection.connect();
}